import { Loader, Button, SearchInput } from 'components/UI/elements';
import { useState, useRef, useEffect } from 'react';
import styles from './styles';
import { AllowedCollection, MoralisNetwork, NFTDisplayData, NFTDisplayServerData } from 'types';
import Image from 'next/image';
import { AdminSearch, EthIcon } from 'assets';
import { useUI } from 'contexts/UIContexts';
import { MoralisController } from 'components/controllers/moralisController';
import { useWeb3 } from 'contexts/Web3Context';
import { NFTDisplay } from 'components/phaser/NFTDisplay';
import InputController from 'components/controllers/inputController';
import { DoubleArrowIcon } from 'components/UI/elements/svgs/doubleArrowIcon';
import { IndentedPanel, NFTCollectionCard, NFTGalleryCard } from 'components/UI/component';

export const NFTGallery = (): JSX.Element => {
  const [{ nftDisplayAdminState, nftDisplayState }, uiDispatch] = useUI();
  const [{ currentAccount }] = useWeb3();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');
  const [networkToggle, setNetworkToggle] = useState<MoralisNetwork>('POLYGON');
  const [activeItem, setActiveItem] = useState<number>();
  const [serverData, setServerData] = useState<NFTDisplayServerData>();

  const [list, setList] = useState<NFTDisplayData[]>();
  const [filteredData, setFilteredData] = useState<AllowedCollection[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<AllowedCollection[]>([]);
  const [currentCollection, setCurrentCollection] = useState<AllowedCollection>();
  const [collectionList, setCollectionList] = useState<AllowedCollection[]>();

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const defaultCursors = [null, null];
  const [cursors, setCursors] = useState(defaultCursors);

  useEffect(() => {
    setActiveItem(undefined);
    InputController.updateDisableKeyboard(nftDisplayAdminState.open, true);
    if (nftDisplayState.serverData) setServerData(nftDisplayState.serverData);
    if (nftDisplayAdminState.open) handleNetworkToggle('POLYGON');
  }, [nftDisplayAdminState]);

  useEffect(() => {
    if (!collectionList) return;
    const filterTemp = collectionList.filter((filter) => filter.name.toLowerCase().includes(searchInput.toLowerCase()));
    setFilteredData(filterTemp.filter((filter) => !selectedFilter.includes(filter)));
  }, [searchInput]);

  const handleNetworkToggle = (network: MoralisNetwork) => {
    setNetworkToggle(network);
    setCollectionList(MoralisController.getCollectionsByNetwork(network));
    setFilteredData(MoralisController.getCollectionsByNetwork(network));
    setCurrentCollection(undefined);
  };

  const handleConfirm = async () => {
    if (!list?.length || activeItem === -1) return;
    const data: NFTDisplayData = list[activeItem];
    NFTDisplay.set(nftDisplayAdminState.installationId, data);
    uiDispatch({
      type: 'UPDATE_NFT_DISPLAY_ADMIN',
      nftDisplayAdminState: { open: false, installationId: undefined },
    });
    resetPaging();
  };

  const fetchAndSetList = async (collection?: AllowedCollection) => {
    setFetching(true);
    const {
      data,
      page: _page,
      cursor: _cursor,
    } = await MoralisController.getWalletNFTs(currentAccount, networkToggle, cursors[page], collection ? [collection] : undefined);
    setList(data);
    setFetching(false);
    setHasNext(!!_cursor);
    if (_cursor && _page === cursors.length - 1) setCursors([...cursors, _cursor]);
  };

  const closeNFTDisplay = () => {
    uiDispatch({
      type: 'UPDATE_NFT_DISPLAY_ADMIN',
      nftDisplayAdminState: { open: false, installationId: undefined },
    });

    if (serverData) void NFTDisplay.displayPhaserImage({ id: serverData.id, image: serverData.image }, nftDisplayAdminState.installationId);

    NFTDisplay.setPreview({
      active: true,
      serverData: serverData || undefined,
      nftData: undefined,
      installationId: nftDisplayAdminState.installationId,
      isOwner: true,
    });
    resetPaging();
    setSearchInput('');
    setSelectedFilter([]);
  };

  const handleItemClick = (i: NFTDisplayData, key: number) => {
    if (!i?.metadata) return;
    NFTDisplay.setPreview({ active: true, nftData: i, installationId: nftDisplayAdminState.installationId, isOwner: true });
    void NFTDisplay.displayPhaserImage({ id: i.id, image: i.metadata.image }, nftDisplayAdminState.installationId);
    setActiveItem(key);
  };

  // const selectSearchItem = (item: AllowedCollection) => {
  //   if (!selectedFilter.includes(item)) {
  //     selectedFilter.push(item);
  //     setSelectedFilter(selectedFilter);
  //     setSearchInput('');
  //   }
  // };

  const handleSetCollection = async (collection: AllowedCollection): Promise<void> => {
    setCurrentCollection(collection);
    await fetchAndSetList(collection);
  };

  const resetPaging = (): void => {
    setCursors(defaultCursors);
    setPage(1);
    setHasNext(false);
  };

  const onPagePrev = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };
  const onPageNext = () => {
    if (!hasNext) return;
    setPage(page + 1);
  };

  useEffect(() => {
    if (currentCollection) void fetchAndSetList(currentCollection);
  }, [page]);

  return (
    <>
      {nftDisplayAdminState.open && (
        <div className="panel-wrapper">
          <IndentedPanel
            hideSides={{ right: true, bottom: true }}
            borrowedColor
            isSidePanelFrame={true}
            inheritHeight
            title={{ value: 'YOUR NFTs', fontSize: '3.2rem' }}
          >
            <div className="gallery-container">
              <div className="search-content">
                <button className="network-toggle clear" onClick={() => handleNetworkToggle(networkToggle === 'POLYGON' ? 'ETHEREUM' : 'POLYGON')}>
                  <Image alt="" src={networkToggle === 'POLYGON' ? AdminSearch : EthIcon} width={40} height={40} />
                </button>
                {!currentCollection && (
                  <div className="input-container">
                    <SearchInput value={searchInput || ''} onChange={setSearchInput} placeholder="Collection search.." color="info" />
                  </div>
                )}
                {/* {searchInput !== '' && filteredData?.length !== 0 && (
                  <div className="searched-wrapper">
                    {filteredData?.map((data, key) => {
                      return (
                        <div key={key} className="searched-item clickable" onClick={() => selectSearchItem(data)}>
                          {data.name}
                        </div>
                      );
                    })}
                  </div>
                )} */}
              </div>
              <div className="category-list-container">
                <>{currentCollection?.name || 'All Collections'}</>
                {fetching && (
                  <span className="fetching-loader">
                    <Loader size={0.2} />
                  </span>
                )}
              </div>
              <div className="scroll-wrapper">
                <div className="scroll-cantainer-wrapper scrollable info">
                  {!currentCollection && (
                    <div className="scroll-container collections" ref={scrollRef}>
                      {filteredData.map((i, key) => {
                        return (
                          <div key={key} className={`shadow ${key === activeItem ? 'active' : ''}`}>
                            <div
                              key={key}
                              className={`installation-wrapper ${key === activeItem ? 'active' : ''}`}
                              onClick={async () => await handleSetCollection(i)}
                            >
                              <NFTCollectionCard collection={i} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {currentCollection && (
                    <div className="scroll-container" ref={scrollRef}>
                      {!fetching &&
                        list?.length !== 0 &&
                        list?.map((i, key) => {
                          return (
                            <div key={key} className={`shadow ${key === activeItem ? 'active' : ''}`}>
                              <div
                                key={key}
                                className={`installation-wrapper ${key === activeItem ? 'active' : ''}`}
                                onClick={() => handleItemClick(i, key)}
                              >
                                <NFTGalleryCard nft={i} />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
              {currentCollection && (
                <div className="pagination-controls">
                  <div onClick={onPagePrev} className="page-nav-btn">
                    <DoubleArrowIcon dir="left" width={18} height={30} fill={page <= 1 || fetching ? 'var(--col-info-400)' : 'var(--col-info-800)'} />
                  </div>
                  <span className="page">{page}</span>
                  <div onClick={onPageNext} className="page-nav-btn">
                    <DoubleArrowIcon dir="right" width={18} height={30} fill={!hasNext || fetching ? 'var(--col-info-400)' : 'var(--col-info-800)'} />
                  </div>
                </div>
              )}

              <div className="buttons-container">
                <Button
                  size={2.2}
                  color="info"
                  onClick={
                    currentCollection
                      ? () => {
                          setCurrentCollection(undefined);
                          setActiveItem(undefined);
                          resetPaging();
                        }
                      : closeNFTDisplay
                  }
                  disableSound
                >
                  <span className="button-text">{currentCollection ? 'Collections' : 'Cancel'}</span>
                </Button>
                <Button size={2.2} onClick={handleConfirm} disabled={activeItem === undefined} color="success" disableSound>
                  <span className="button-text">Confirm</span>
                </Button>
              </div>
            </div>
          </IndentedPanel>
        </div>
      )}

      <style jsx>{styles}</style>
    </>
  );
};
