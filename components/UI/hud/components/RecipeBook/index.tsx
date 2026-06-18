import { useState, useEffect } from 'react';
import { ethers, providers } from 'ethers';
import _ from 'lodash';
import { useWeb3 } from 'contexts/Web3Context';
import { getInstallationTypes, getTileTypes } from 'web3/subgraph/queries';
import { useSubgraph } from 'web3/subgraph';
import { getContract } from 'web3/contract';
import { getContractFromRecipeType, getThemeColor } from 'helpers/functions';
import useAavegotchiSound from 'hooks/useAavegotchiSound';
import { Loader, FilterSelect, SearchInput, SortSelect } from 'components/UI/elements';
import { Recipe, SortOption, TileType, NetworkNames, InstallationType } from 'types';
import { RecipeBookToggle } from './RecipeBookToggle';
import { RecipeBookModal } from './RecipeBookModal';
import styles from './styles';
import { RecipeCard } from 'components/UI/component';
import { gotchiverseSubgraph } from 'shared_code/web3/shared.const.web3';
import { useGame } from 'contexts/GameContext';

interface Props {
  selectRecipe: (recipe: Recipe) => void;
  disabled: boolean;
}

const sortOptions: SortOption[] = [
  {
    name: 'ID',
    value: 'id',
    direction: 'desc',
  },
  {
    name: 'Name',
    value: 'name',
    direction: 'asc',
  },
  {
    name: 'Cost',
    value: 'cost',
    direction: 'desc',
  },
];

const typeFilters = [
  {
    name: 'Tiles',
    value: 'tile',
  },
  {
    name: 'Decorations',
    value: 'decoration',
  },
  {
    name: 'Harvesters',
    value: 'harvester',
  },
  {
    name: 'Reservoirs',
    value: 'reservoir',
  },
  {
    name: 'Aaltars',
    value: 'aaltar',
  },
  {
    name: 'Maakers',
    value: 'maaker',
  },
];
export const RecipeBook = ({ selectRecipe, disabled }: Props): JSX.Element => {
  const [{ gameConfig }] = useGame();
  const [{ currentNetwork, globalProvider }] = useWeb3();
  const { click } = useAavegotchiSound();

  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSelect = (recipe: Recipe) => {
    click();
    selectRecipe(recipe);
    setOpen(false);
  };
  const [nameFilter, setNameFilter] = useState<string>(undefined);
  const [sort, setSort] = useState<SortOption>({ name: 'ID', value: 'id', direction: 'asc' });
  const [typeFilter, setTypeFilter] = useState({
    tile: true,
    aaltar: true,
    reservoir: true,
    harvester: true,
    decoration: true,
    maaker: true,
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const onSetSortBy = (name: string, value: string, direction: 'asc' | 'desc') => {
    setSort({
      name,
      value,
      direction,
    });
  };
  const fetchAndSetRecipesMatic = async (nameFilter: string, typeFilter, sortBy: SortOption) => {
    setPending(true);

    const now = new Date().valueOf() / 1000;

    const installations = await useSubgraph<{ installationTypes: InstallationType[] }>(
      getInstallationTypes(nameFilter, typeFilter),
      gotchiverseSubgraph,
    );

    // Filter based deprecatedAt
    const installationTypes: InstallationType[] = installations.installationTypes.filter((installation: InstallationType) => {
      return !Number(installation.deprecatedAt) || Number(installation.deprecatedAt >= now);
    });
    console.log('installations', installationTypes);
    const tiles = typeFilter.tile ? await useSubgraph<{ tileTypes: TileType[] }>(getTileTypes(nameFilter), gotchiverseSubgraph) : { tileTypes: [] };
    const tileTypes: TileType[] = tiles.tileTypes.filter((tile: TileType) => {
      return !Number(tile.deprecatedAt) || Number(tile.deprecatedAt >= now);
    });
    console.log('tiles', tileTypes);
    const recipes = _.concat<InstallationType | TileType>(installationTypes, tileTypes).map((item: InstallationType | TileType): Recipe => {
      const isInstallation = 'installationType' in item;
      const data: Recipe = {
        id: item.id,
        name: item.name,
        ingredients: {
          fud: Number(ethers.utils.formatEther(item.alchemicaCost[0])),
          fomo: Number(ethers.utils.formatEther(item.alchemicaCost[1])),
          alpha: Number(ethers.utils.formatEther(item.alchemicaCost[2])),
          kek: Number(ethers.utils.formatEther(item.alchemicaCost[3])),
        },
        craftingTime: Number(item.craftTime),
        itemType: isInstallation ? item.installationType : item.tileType,
        type: isInstallation ? 'INSTALLATION' : 'TILE',
        installationType: isInstallation ? Number(item.installationType) : undefined,
        deprecated: false,
        endDate: undefined,
      };
      return data;
    });

    let sorted;

    if (sortBy.value === 'id') sorted = _.sortBy(recipes, (recipe: Recipe) => Number(recipe.id));
    else if (sortBy.value === 'name') sorted = _.sortBy(recipes, (recipe: Recipe) => recipe.name);
    else if (sortBy.value === 'cost') sorted = _.sortBy(recipes, (recipe: Recipe) => recipe.ingredients.fud);
    if (sortBy.direction === 'desc') sorted = _.reverse(sorted);

    setRecipes(sorted);

    setPending(false);
  };

  const fetchContractRecipe = async (network: NetworkNames, provider: providers.Provider, type: 'INSTALLATION' | 'TILE'): Promise<Recipe[]> => {
    const contractType = getContractFromRecipeType(type);
    const contractCall = type === 'INSTALLATION' ? 'getInstallationTypes' : 'getTileTypes';
    const contract = await getContract(network, provider, contractType, false);
    let fetchedRecipes: Recipe[] = [];
    if (contract) {
      const response = await contract[contractCall]([]);
      fetchedRecipes = response
        .map((recipe, i) => {
          const data = {
            id: i,
            name: recipe.name,
            ingredients: {
              fud: Number(ethers.utils.formatEther(recipe.alchemicaCost[0])),
              fomo: Number(ethers.utils.formatEther(recipe.alchemicaCost[1])),
              alpha: Number(ethers.utils.formatEther(recipe.alchemicaCost[2])),
              kek: Number(ethers.utils.formatEther(recipe.alchemicaCost[3])),
            },
            craftingTime: Number(recipe.craftTime),
            itemType: type === 'INSTALLATION' ? recipe.installationType : recipe.tileType,
            type,
            installationType: recipe.installationType,
            deprecated: recipe.deprecated,
            // TODO: refactor endDate logic to work with contract endDate
            endDate: Number(recipe.endDate),
          };
          // assing leve for installationTypes
          if (recipe.level) _.assign(data, { level: recipe.level });
          return data;
        })
        .filter((recipe) => !recipe.deprecated && (recipe.level ? recipe.level === 1 : true && recipe.id !== 0));
      // .filter((recipe) => recipe.id !== 2);
    }
    return fetchedRecipes;
  };

  const fetchAndSetRecipesMumbai = async (currentNetwork, globalProvider) => {
    setPending(true);
    const fetchedInstallations = await fetchContractRecipe(currentNetwork, globalProvider, 'INSTALLATION');
    const fetchedTiles = await fetchContractRecipe(currentNetwork, globalProvider, 'TILE');
    const fetchedItems = _.concat(fetchedInstallations, fetchedTiles);
    setRecipes(fetchedItems);
    setPending(false);
  };

  useEffect(() => {
    if (currentNetwork === 'mumbai' && globalProvider) {
      void fetchAndSetRecipesMumbai(currentNetwork, globalProvider);
    }
  }, [currentNetwork, globalProvider]);

  useEffect(() => {
    if (open && currentNetwork === 'matic' && sort !== undefined) {
      void fetchAndSetRecipesMatic(nameFilter, typeFilter, sort);
    }
  }, [currentNetwork, nameFilter, typeFilter, sort, open]);

  return (
    <>
      <RecipeBookToggle onClick={() => setOpen(true)} disabled={disabled} />
      <RecipeBookModal open={open} onClose={() => setOpen(false)}>
        {pending && (
          <>
            <div className="loading-box"></div>
            <div className="loading-content">
              <Loader size={0.2} />
              <p>Loading</p>
            </div>
          </>
        )}
        <div className="filter-container">
          <div className="search-input">
            <SearchInput value={nameFilter || ''} onChange={setNameFilter} color={getThemeColor()} placeholder="Search by name, type, etc..." />
          </div>
          <div className="filter-options">
            <FilterSelect
              filters={typeFilters}
              width="17rem"
              onChange={(state) => {
                setTypeFilter(state);
              }}
            />
            <SortSelect options={sortOptions} selected={sort} placeholder="Sort by" width="14rem" onSelect={onSetSortBy} useTheme={true} />
          </div>
        </div>
        <div className={`scrollable ${gameConfig.gotchiverseTheme}`}>
          <div className="content">
            {recipes?.map((recipe, i) => (
              <RecipeCard onClick={handleSelect} recipe={recipe} key={i} />
            ))}
          </div>
        </div>
      </RecipeBookModal>
      <style jsx>{styles}</style>
    </>
  );
};
