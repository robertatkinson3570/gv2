/* eslint-disable multiline-ternary */
import { useState } from 'react';
import {
  Button,
  Loader,
  VerticalSlider,
  Tabs,
  ActionButton,
  Select,
  Tooltip,
  PendingButton,
  ObservorButton,
  WalletConnectButton,
  Web3Button,
  ArrowTitle,
  CloseButton,
  Tab,
  ItemShopButton,
  Input,
  CheckIcon,
} from 'components/UI/elements';
import installationsJson from 'shared_code/data/installations.json';
import {
  UsersHealthPanel,
  CarriedAlchemicaPanel,
  SettingsMenu,
  QuitGameModal,
  CraftingTable,
  WalletToggle,
  Minimap,
  WithdrawStation,
  GotchiPocket,
  ChatBox,
  ParcelDashboard,
  HarvesterModal,
  NotificationStack,
  ReservoirModal,
  MaakerModal,
  AccessRightsModal,
  ActiveEventsModal,
  EventHologram,
  EventModal,
  ExitArenaModal,
  AarenaLobby,
  Leaderboard,
} from 'components/UI/hud/components';
import { AlchemicalAalter, BuildMode, HammerIcon, ItemShopImg, ItemShopSm } from 'assets/images';
import { showNotification, updateTransactionNotificationStatus } from 'contexts/NotificationContext/actions';
import { useNotification } from 'contexts/NotificationContext';
import { CraftIcon, UpgradesIcon } from 'assets';
import { ApprovalNeeded } from 'components/UI/widgets';
import { SpawnSelector } from 'components/UI/sections';
import { UpgradeModal } from 'components/UI/hud/components/modals';
import { useUI } from 'contexts/UIContexts';
import { useUserWalletDataContext } from 'components/utility/WalletConnect';
import { Rarity, ShopItem } from 'types';
import Head from 'next/head';
import { GameGuide } from 'components/UI/widgets/GameGuide';
import {
  AlertBox,
  BasePanel,
  BorderedPanel,
  BuyCTACard,
  DialogueContainer,
  EventListCard,
  FullscreenModal,
  IndentedPanel,
  InventoryCard,
  Modal,
  ShopItemElement,
  ToastNotification,
  TopNotification,
  WalletActivity,
} from 'components/UI/component';
import { TokenManager } from 'components/UI/component/alchemica/tokenManager';
import { useRealm } from 'contexts/RealmContext';
import { AVAILABLE_SHOP_ITEMS } from 'helpers/items.helpers';
import { useWeb3 } from 'contexts/Web3Context';
import { Background, Content, SideConfig, Title } from 'components/UI/component/panels/BasePanel/types';

const colors = [
  'transparent',
  'black',
  'white',
  'pink-border',
  'pink-350',
  'purple-border',
  'purple-400',
  'info-border',
  'info-400',
  'blue-border',
  'halloween-border',
  'current',
  'grad-magenta',
  'grad-magenta-2',
  'grad-magenta-3',
  'grad-info',
  'grad-info-2',
  'grad-purple',
];

// Easily test UI components in isolation
const ComponentLibrary = (): JSX.Element => {
  const [, notificationDispatch] = useNotification();
  const [, uiDispatch] = useUI();
  const [{ currentAccount }] = useWeb3();

  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [quitGameModalOpen, setQuitGameModalOpen] = useState(false);
  const [craftingMenuOpen, setCraftingTableOpen] = useState(false);
  const [dialogueMenuOpen, setDialogueMenuOpen] = useState(false);
  const [transactionNotificationId, setTransactionNotificationId] = useState<string>();
  const [sliderValue, setSliderValue] = useState(1);
  const [currentTab, setCurrentTab] = useState('Tab 1');
  const [selectValue, setSelectValue] = useState('1');
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [spawnSelectorType, setSpawnSelectorType] = useState<string>('');

  const { showSelectWalletModal } = useUserWalletDataContext();
  const [_, realmDispatch] = useRealm();

  const checkUser = async () => {
    showSelectWalletModal(true);
  };

  const [panelTab, setPanelTab] = useState('Sides');
  const [panelHideSides, setPanelHideSides] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });
  const [lockPanelSides, setLockPanelSides] = useState(true);
  const [panelCapSize, setPanelCapSize] = useState(15);
  const [panelCapSizes, setPanelCapSizes] = useState({
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
  });

  const [hasPanelTitle, setHasPanelTitle] = useState(true);
  const [panelTitle, setPanelTitle] = useState<Title>({
    value: 'Title',
    color: 'white',
    borderSize: 0.2,
    background: 'black',
    fontSize: 2,
    width: '2em',
    padding: '0.5em 1em',
    hasShadow: false,
    component: null,
  });

  const [panelContent, setPanelContent] = useState<Content>({
    padding: 5,
    color: 'white',
    scrollable: true,
  });

  const [panelSides, setPanelSides] = useState<SideConfig>({
    color: 'pink-350',
    size: 15,
    thickness: 3,
  });

  const [isDoubleBorder, setDoubleBorder] = useState(false);
  const [secondarySides, setSecondarySides] = useState({
    size: 1,
    thickness: 3,
    spacing: 4,
    shadow: false,
    color: 'pink-350',
  });

  const [panelBackground, setPanelBackground] = useState<Background>({
    color: 'black',
    opacity: 1,
    hasShadow: false,
  });

  const [hasScanlines, setHasScanlines] = useState(false);
  const [useDefaultScanlines, setUseDefaultScanlines] = useState(true);
  const [scanlineConfig, setScanlineConfig] = useState({
    color: 'purple-400',
    opacity: 0.2,
    spacing: 0.75,
    size: 0.2,
  });

  return (
    <>
      <Head>
        <title>LIB | Gotchiverse</title>
        <meta property="og:title" content="LIB | Gotchiverse" key="title" />
      </Head>
      {/* <Header /> */}
      <div className="bg scrollable">
        <WithdrawStation />
        <Button size={3.2} onClick={checkUser} color="info">
          CONNECT
        </Button>
        <section className="component-section">
          <h1 className="section-header">Styled Titles</h1>
          <div className="titles">
            <ArrowTitle text="Arrow Title" size={9} leftArrows={true} />
          </div>
          <h1 className="section-header">Reusable Elements</h1>
          <h1 className="component-header">Panels</h1>
          <h1 className="sub-component-header">Base Panel</h1>
          <div className="py-12 grid grid-flow-row grid-cols-2 gap-4 items-start justify-start">
            <div className="flex flex-col bg-black text-white p-8 gap-6">
              <Tabs options={['Sides', 'Border', 'Title', 'Content', 'Background']} onSelect={setPanelTab} currentOption={panelTab}></Tabs>

              {panelTab === 'Sides' && (
                <>
                  <div className="flex flex-row items-center justify-start gap-4 min-h-[8rem]">
                    <div>
                      <CheckIcon size={15} checked={lockPanelSides} onChange={setLockPanelSides} />
                      Lock Cap Sizes
                    </div>

                    {lockPanelSides ? (
                      <div className="flex flex-row items-center justify-between">
                        <h3>Cap Size</h3>
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={panelCapSize}
                          onChange={(e) => setPanelCapSize(Number(e.target.value))}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-row items-center justify-between">
                        <h3>Cap Sizes</h3>
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={panelCapSizes?.top ?? 0}
                          onChange={(e) =>
                            setPanelCapSizes({
                              ...panelCapSizes,
                              top: Number(e.target.value),
                            })
                          }
                        />
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={panelCapSizes?.right ?? 0}
                          onChange={(e) =>
                            setPanelCapSizes({
                              ...panelCapSizes,
                              right: Number(e.target.value),
                            })
                          }
                        />
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={panelCapSizes?.bottom ?? 0}
                          onChange={(e) =>
                            setPanelCapSizes({
                              ...panelCapSizes,
                              bottom: Number(e.target.value),
                            })
                          }
                        />
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={panelCapSizes?.left ?? 0}
                          onChange={(e) =>
                            setPanelCapSizes({
                              ...panelCapSizes,
                              left: Number(e.target.value),
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-stretch gap-8">
                    <div>
                      <CheckIcon
                        size={15}
                        checked={panelHideSides.top}
                        onChange={(e) =>
                          setPanelHideSides({
                            ...panelHideSides,
                            top: e,
                          })
                        }
                      />
                      Top Cap
                    </div>
                    <div>
                      <CheckIcon
                        size={15}
                        checked={panelHideSides.right}
                        onChange={(e) =>
                          setPanelHideSides({
                            ...panelHideSides,
                            right: e,
                          })
                        }
                      />
                      Right Cap
                    </div>
                    <div>
                      <CheckIcon
                        size={15}
                        checked={panelHideSides.bottom}
                        onChange={(e) =>
                          setPanelHideSides({
                            ...panelHideSides,
                            bottom: e,
                          })
                        }
                      />
                      Bottom Cap
                    </div>
                    <div>
                      <CheckIcon
                        size={15}
                        checked={panelHideSides.left}
                        onChange={(e) =>
                          setPanelHideSides({
                            ...panelHideSides,
                            left: e,
                          })
                        }
                      />
                      Left Cap
                    </div>
                  </div>
                </>
              )}

              {panelTab === 'Title' && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div>
                      <CheckIcon size={15} checked={hasPanelTitle} onChange={(e) => setHasPanelTitle(!hasPanelTitle)} />
                      {hasPanelTitle ? 'Hide Title' : 'Show Title'}
                    </div>
                    <div>
                      <h3>Value</h3>
                      <Input
                        value={panelTitle.value}
                        onChange={(e) =>
                          setPanelTitle({
                            ...panelTitle,
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div>
                      <h3>Color</h3>
                      <Select
                        options={colors.map((c) => ({
                          name: c,
                          value: c,
                        }))}
                        value={panelTitle.color}
                        onSelect={(val) =>
                          setPanelTitle({
                            ...panelTitle,
                            color: val,
                          })
                        }
                      />
                    </div>
                    <div>
                      <h3>Background</h3>
                      <Select
                        options={colors.map((c) => ({
                          name: c,
                          value: c,
                        }))}
                        value={panelTitle.background}
                        onSelect={(val) =>
                          setPanelTitle({
                            ...panelTitle,
                            background: val,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {panelTab === 'Title' && <pre>{JSON.stringify(panelTitle, null, 2)}</pre>}

              {panelTab === 'Content' && (
                <>
                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div>
                      <h3>Color</h3>
                      <Select
                        options={colors.map((c) => ({
                          name: c,
                          value: c,
                        }))}
                        value={panelContent.color}
                        onSelect={(val) =>
                          setPanelContent({
                            ...panelContent,
                            color: val,
                          })
                        }
                      />
                    </div>
                    <div>
                      <h3>Scrollable</h3>
                      <CheckIcon
                        size={15}
                        checked={panelContent?.scrollable}
                        onChange={(e) =>
                          setPanelContent({
                            ...panelContent,
                            scrollable: e,
                          })
                        }
                      />
                    </div>
                    <div>
                      <h3>Padding</h3>
                      <VerticalSlider
                        size={0.5}
                        max={20}
                        min={0}
                        step={1}
                        value={panelContent.padding}
                        onChange={(e) =>
                          setPanelContent({
                            ...panelContent,
                            padding: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              )}
              {panelTab === 'Content' && <pre>{JSON.stringify(panelContent, null, 2)}</pre>}

              {panelTab === 'Background' && (
                <>
                  <div className="flex flex-row items-center justify-stretch gap-4">
                    <div>
                      <h3>Color</h3>
                      <Select
                        options={colors.map((c) => ({
                          name: c,
                          value: c,
                        }))}
                        value={panelBackground.color}
                        onSelect={(val) =>
                          setPanelBackground({
                            ...panelBackground,
                            color: val,
                          })
                        }
                      />
                    </div>
                    <div>
                      <h3>Opacity</h3>
                      <VerticalSlider
                        size={0.5}
                        max={1}
                        min={0}
                        step={0.05}
                        value={panelBackground.opacity}
                        onChange={(e) =>
                          setPanelBackground({
                            ...panelBackground,
                            opacity: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <CheckIcon
                        size={15}
                        checked={panelBackground.hasShadow}
                        onChange={(e) =>
                          setPanelBackground({
                            ...panelBackground,
                            hasShadow: e,
                          })
                        }
                      />
                      Shadow
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-4">
                    <div>
                      <CheckIcon size={15} checked={hasScanlines} onChange={(e) => setHasScanlines(e)} />
                      Scanlines
                    </div>
                    <div>
                      <CheckIcon size={15} checked={useDefaultScanlines} onChange={(e) => setUseDefaultScanlines(e)} />
                      Use Defaults
                    </div>
                    {hasScanlines && !useDefaultScanlines && (
                      <>
                        <div>
                          <h3>Size</h3>
                          <VerticalSlider
                            size={0.5}
                            max={1}
                            min={0}
                            step={0.05}
                            value={scanlineConfig.size}
                            onChange={(e) =>
                              setScanlineConfig({
                                ...scanlineConfig,
                                size: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <h3>Spacing</h3>
                          <VerticalSlider
                            size={0.5}
                            max={5}
                            min={0}
                            step={0.01}
                            value={scanlineConfig.spacing}
                            onChange={(e) =>
                              setScanlineConfig({
                                ...scanlineConfig,
                                spacing: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <h3>Opacity</h3>
                          <VerticalSlider
                            size={0.5}
                            max={1}
                            min={0}
                            step={0.05}
                            value={scanlineConfig.opacity}
                            onChange={(e) =>
                              setScanlineConfig({
                                ...scanlineConfig,
                                opacity: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <h3>Color</h3>
                          <Select
                            options={colors.map((c) => ({
                              name: c,
                              value: c,
                            }))}
                            value={scanlineConfig.color}
                            onSelect={(val) => setScanlineConfig({ ...scanlineConfig, color: val })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {panelTab === 'Background' && (
                <pre>
                  {JSON.stringify(
                    {
                      ...panelBackground,
                      scanlines: hasScanlines ? scanlineConfig : undefined,
                    },
                    null,
                    2,
                  )}
                </pre>
              )}

              {panelTab === 'Border' && (
                <>
                  <div className="flex flex-row items-center justify-stretch gap-4 min-h-[8rem]">
                    <div>
                      <h3>Color</h3>
                      <Select
                        options={colors.map((c) => ({
                          name: c,
                          value: c,
                        }))}
                        value={panelSides.color}
                        onSelect={(val) =>
                          setPanelSides({
                            ...panelSides,
                            color: val,
                          })
                        }
                      />
                    </div>
                    <div>
                      <h3>Thickness</h3>
                      <VerticalSlider
                        size={0.5}
                        max={20}
                        min={0}
                        step={1}
                        value={panelSides.thickness}
                        onChange={(e) =>
                          setPanelSides({
                            ...panelSides,
                            thickness: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <CheckIcon size={15} checked={isDoubleBorder} onChange={(e) => setDoubleBorder(e)} />
                      Double Borders
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-stretch gap-4 min-h-[8rem]">
                    {isDoubleBorder && (
                      <>
                        <h3>Thickness</h3>
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={secondarySides.thickness}
                          onChange={(e) =>
                            setSecondarySides({
                              ...secondarySides,
                              thickness: Number(e.target.value),
                            })
                          }
                        />
                        <h3>Spacing</h3>
                        <VerticalSlider
                          size={0.5}
                          max={50}
                          min={0}
                          step={1}
                          value={secondarySides.spacing}
                          onChange={(e) =>
                            setSecondarySides({
                              ...secondarySides,
                              spacing: Number(e.target.value),
                            })
                          }
                        />
                        <div>
                          <CheckIcon
                            size={15}
                            checked={secondarySides?.shadow}
                            onChange={(e) =>
                              setSecondarySides({
                                ...secondarySides,
                                shadow: e,
                              })
                            }
                          />
                          Shadow
                        </div>
                        <div>
                          <h3>Color</h3>
                          <Select
                            options={colors.map((c) => ({
                              name: c,
                              value: c,
                            }))}
                            value={secondarySides.color}
                            onSelect={(val) =>
                              setSecondarySides({
                                ...secondarySides,
                                color: val,
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {panelTab === 'Border' && (
                <pre>
                  {JSON.stringify(
                    {
                      ...panelSides,
                      secondarySides: isDoubleBorder ? secondarySides : undefined,
                    },
                    null,
                    2,
                  )}
                </pre>
              )}
            </div>
            <BasePanel
              title={hasPanelTitle ? panelTitle : null}
              inherit={{
                width: true,
                height: true,
              }}
              hideSides={panelHideSides}
              sides={{
                ...panelSides,
                secondarySides: isDoubleBorder ? secondarySides : undefined,
                size: lockPanelSides ? panelCapSize : undefined,
                top: !lockPanelSides ? panelCapSizes?.top : panelCapSize,
                right: !lockPanelSides ? panelCapSizes?.right : panelCapSize,
                bottom: !lockPanelSides ? panelCapSizes?.bottom : panelCapSize,
                left: !lockPanelSides ? panelCapSizes?.left : panelCapSize,
              }}
              background={{
                ...panelBackground,
                scanlines: hasScanlines ? (useDefaultScanlines ? true : scanlineConfig) : undefined,
              }}
              content={panelContent}
            >
              <p>
                lorem ipsum sid amet dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut
                enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in
                culpa qui officia deserunt mollit anim id est laborum
              </p>
            </BasePanel>
          </div>

          <hr />
          <h1 className="sub-component-header">Default Base Panel</h1>
          <BasePanel>
            <h3>Any content can go in here</h3>
            <p>Boogie grooves and boogie shoes</p>
          </BasePanel>

          <hr />
          <h1 className="sub-component-header">Indented Panel</h1>
          <IndentedPanel>
            <h3>Any content can go in here</h3>
            <p>Boogie grooves and boogie shoes</p>
          </IndentedPanel>

          <hr />
          <div className="row">
            <IndentedPanel hideSides={{ right: true }}>
              <h3>Hidden side</h3>
              <p>hideSides={'{{ right: true }}'}</p>
            </IndentedPanel>
            <IndentedPanel hideSides={{ bottom: true }}>
              <h3>Hidden side</h3>
              <p>hideSides={'{{ bottom: true }}'}</p>
            </IndentedPanel>
            <IndentedPanel hideSides={{ left: true }}>
              <h3>Hidden side</h3>
              <p>hideSides={'{{ left: true }}'}</p>
            </IndentedPanel>
            <IndentedPanel hideSides={{ top: true }}>
              <h3>Hidden side</h3>
              <p>hideSides={'{{ top: true }}'}</p>
            </IndentedPanel>
          </div>
          <hr />
          <IndentedPanel title="Title" padding={2.4}>
            <h3>Panel with title</h3>
            <p>title=&quot;Title&quot; padding={'{24}'}</p>
          </IndentedPanel>
          <hr />
          <h1 className="sub-component-header">Bordered Panel</h1>
          <BorderedPanel title="Bordered">
            <div style={{ width: '40.0rem', height: '20.0rem', padding: '5.4rem 3.2rem' }}>
              <h3>Bordered panel</h3>
              <p>This is a fancy panel</p>
            </div>
          </BorderedPanel>
          <hr />

          <h1 className="component-header">Buttons</h1>
          <h1 className="sub-component-header">Action Button</h1>
          <ActionButton img={CraftIcon} onClick={() => console.log('ACTION')} size={4} />
          <ActionButton color="halloween" img={CraftIcon} onClick={() => console.log('ACTION')} size={4} />
          <ActionButton color="pink" img={CraftIcon} onClick={() => null} />
          <ActionButton color="info" img={BuildMode} onClick={() => null} disableSound text="BUILD MODE" />
          <ActionButton color="info" img={ItemShopImg} onClick={() => null} text="ITEM SHOP" isAlienFont />
          <hr />

          <h1 className="sub-component-header">Tab Buttons</h1>
          <div className="flex gap-10">
            <Tab img={UpgradesIcon} onClick={() => null} active />
            <Tab img={ItemShopSm} onClick={() => null} active />
            <Tab img={HammerIcon} onClick={() => null} active={false} />
          </div>
          <hr />
          <h1 className="sub-component-header">Button (Rabbet Variant - Default)</h1>
          <Button>Primary</Button>
          <Button secondary>Secondary</Button>

          <hr />
          <h1 className="sub-component-header">Button (Outlined Variant)</h1>
          <Button variant="rounded">Primary</Button>
          <Button secondary variant="rounded">
            Secondary
          </Button>
          <Button disabled variant="rounded">
            Disabled
          </Button>

          <hr />
          <h1 className="sub-component-header">Close Button</h1>
          <CloseButton />
          <CloseButton secondary />

          <hr />
          <h1 className="sub-component-header">Web3 Button</h1>
          <Web3Button user="0x71...0689" color="purple" handleLogout={null} jazzicon network="mumbai" />

          <hr />
          <h1 className="sub-component-header">Pending Button</h1>
          <PendingButton title="Upgrading now:" message="3 installations" onClick={() => null} />

          <hr />
          <h1 className="sub-component-header">Join As Observoor</h1>
          <ObservorButton isNakedGotchi={false} onClick={null} />

          <hr />
          <h1 className="sub-component-header">Join As a Nakey Gotchi</h1>
          <ObservorButton isNakedGotchi={true} onClick={null} />

          <hr />
          <h1 className="sub-component-header">Connect Wallet</h1>
          <WalletConnectButton clickable onClick={null} />

          <h1 className="sub-component-header">PlayerDashboard</h1>
          <Button
            onClick={() => {
              realmDispatch({
                type: 'UPDATE_USER_TRAITS',
                userTraits: {
                  alchemicaCarryingCapacity: 3500,
                  maxHealth: 1200,
                  ap: 100,
                  maxAP: 150,
                  defense: 82,
                  evasion: 170,
                  luck: 1,
                  speed: 5,
                  melee: 10,
                  range: 4,
                  regen: 16,
                  apRegenAmount: 2.4,
                  healthRegenAmount: 10,
                },
                userTraitsBases: {
                  alchemicaCarryingCapacity: 250,
                  maxHealth: 1000,
                  ap: 80,
                  maxAP: 100,
                  defense: 69,
                  evasion: 160,
                  luck: 1,
                  speed: 3,
                  melee: 6,
                  range: 10,
                },
                userWearableTraitBonuses: {
                  alchemicaCarryingCapacity: 0,
                  maxHealth: 0,
                  ap: 0,
                  maxAP: 0,
                  defense: 0,
                  evasion: 0,
                  luck: 0,
                  speed: 0,
                  melee: 0,
                  range: 0,
                  regen: 0,
                  apRegenAmount: 0,
                  healthRegenAmount: 0,
                },
              });
              realmDispatch({
                type: 'UPDATE_ALCHEMICA',
                alchemica: {
                  fud: 281.21,
                  fomo: 425.07,
                  alpha: 232.15,
                  kek: 0.78,
                  total: 1498,
                },
              });
              realmDispatch({
                type: 'UPDATE_SELECTED_PLAYER',
                selectedPlayer: {
                  authToken: '',
                  id: '34221',
                  name: 'olaf',
                  owner: '',
                  network: '',
                  collateralColor: '',
                  level: 9,
                  isSpectator: false,
                },
                gotchiUrl: undefined,
                backgroundColor: '',
                isAavegotchiLent: false,
                escrow: '',
                ownedParcels: [],
              });
            }}
          >
            Mockup Player Dashboard
          </Button>
          {/* <div style={{ position: 'relative', width: '600px', height: '200px' }}>
            <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
              <PlayerDashboard />
            </div>
          </div> */}
          <hr />
          <hr />
          <h1 className="sub-component-header">GAME GUIDE</h1>
          <GameGuide />

          <h1 className="component-header">Modals</h1>

          <h1 className="sub-component-header">Modal</h1>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal title="Modal" open={modalOpen} onClose={() => setModalOpen(false)}>
            <h1>Example Modal</h1>
            <p>You can put any React Element as a child. SO go Crazy!</p>
          </Modal>
          <hr />
          <h1 className="sub-component-header">Fullscreen Modal</h1>
          <Button onClick={() => setFullscreenModalOpen(true)}>Open Fullscreen modal</Button>
          <FullscreenModal title="Fullscreen Modal" open={fullscreenModalOpen} onClose={() => setFullscreenModalOpen(false)}>
            <h1>Example Fullscreen Modal</h1>
            <p>You can put any React Element as a child. SO go Crazy!</p>
          </FullscreenModal>
          <hr />
          <h1 className="sub-component-header">Dialogue Container</h1>
          <Button onClick={() => setDialogueMenuOpen(true)}>Open Dialogue Container</Button>
          <DialogueContainer open={dialogueMenuOpen} title="Dialogue Menu" onClose={() => setDialogueMenuOpen(false)} img={AlchemicalAalter}>
            This is the child content
          </DialogueContainer>
          <hr />
          <h1 className="sub-component-header">Loader</h1>
          <Loader />
          <hr />

          <h1 className="component-header">Notifications</h1>
          <h1 className="sub-component-header">Toast Notifications</h1>

          <div className="row-2">
            <ToastNotification type="success" title="Success" message="Example success notification" />
            <ToastNotification type="error" title="Error" message="Example error notification" />
            <ToastNotification type="info" title="Info" message="Example info notification" />
            <ToastNotification type="pending" title="Pending" message="Example pending notification" />
            <ToastNotification type="warning" title="Warning" message="Example warning notification" />
          </div>

          <h1 className="sub-component-header">Alert Box</h1>
          <div className="row-2">
            <AlertBox type="success" title="Success" message="Example success notification" />
            <AlertBox type="error" title="Error" message="Example error notification" />
            <AlertBox type="info" title="Info" message="Example info notification" />
            <AlertBox type="pending" title="Pending" message="Example pending notification" />
            <AlertBox type="warning" title="Warning" message="Example warning notification" />
          </div>

          <h1 className="sub-component-header">Top Notification</h1>
          <div className="row-2">
            <TopNotification>Hello</TopNotification>
          </div>

          <section className="component-section">
            <h1 className="section-header">Tooltip</h1>
            <Tooltip title="Request ID:" message="aaa-bbb-ccc-ddd-1111-1111-3333" actionType="copy"></Tooltip>
          </section>

          <section className="component-section">
            <h1 className="section-header">Buy CTA Card</h1>
            <div className="flex items-center justify-between w-full gap-8">
              <BuyCTACard type="card-baazaar" title="Card Title" description="Card description in a few words" ctaTitle="Call to Action" />
              <BuyCTACard type="card-lending" title="Card Title" description="Card description in a few words" ctaTitle="Call to Action" />
            </div>
          </section>

          <h1 className="component-header">Inputs</h1>
          <h1 className="sub-component-header">Vertical Slider</h1>
          <div className="row-2">
            {sliderValue && (
              <VerticalSlider size={1.8} max={100} min={0} step={1} value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
            )}
            {sliderValue && (
              <VerticalSlider
                size={1.8}
                max={100}
                min={0}
                step={1}
                value={sliderValue}
                onChange={(e) => setSliderValue(Number(e.target.value))}
                color="yellow"
              />
            )}
          </div>
          <h1 className="sub-component-header">Select</h1>
          <Select
            options={[
              { value: '1', name: 'Option 1' },
              { value: '2', name: 'Option 2' },
              { value: '3', name: 'Option 3' },
            ]}
            value={selectValue}
            onSelect={setSelectValue}
          />
          <hr />
          <h1 className="component-header">Navigation</h1>
          <h1 className="sub-component-header">Tabs</h1>
          <Tabs options={['Tab 1', 'Tab 2']} onSelect={setCurrentTab} currentOption={currentTab} />

          <hr />
          <h1 className="component-header">Cards</h1>
          <h1 className="sub-component-header">Installation Card</h1>
          <div className="row">
            {Object.values(installationsJson).map((inst, key) => {
              return (
                <InventoryCard
                  key={key}
                  installation={{
                    type: inst.type as 'INSTALLATION' | 'TILE',
                    name: inst.name,
                    id: inst.itemId,
                    level: inst.level,
                    itemType: inst.installationType,
                    rarity: inst.name.split(' ')[0].toLowerCase() as Rarity,
                  }}
                  quantity={3}
                />
              );
            })}
          </div>

          <h1 className="sub-component-header">Event Card</h1>
          <div style={{ width: '60rem' }}>
            <EventListCard
              event={{
                id: '30737',
                title: 'MUSIC CITY GOTCHIGANG AART GALLERY',
                priority: 2497,
                startTime: 1666824411,
                endTime: 1676987211,
                lastTimeUpdated: 1667053397,
                cancelled: false,
                parcelId: 'C-8032-1776-R',
                parcel: {
                  parcelId: 'C-8032-1776-R',
                  tokenId: '30737',
                  hood: 'C82',
                  parcelHash: 'together-aambassador-several',
                  district: 27,
                },
                active: true,
                basePriority: 14360,
                minutesDelta: 17491.882916665076,
                image: null,
                count: 0,
              }}
              onSelect={() => {
                // EMPTY
              }}
            />
          </div>
        </section>

        <section className="component-section">
          <h1 className="section-header">HUD Elements</h1>
          <h1 className="sub-component-header">Gotchi Pocket</h1>
          <GotchiPocket />

          <h1 className="sub-component-header">Users Health Panel</h1>
          <UsersHealthPanel name="MinecraftKid420" health={{ current: 25, max: 100 }} img="" />
          <hr />
          <h1 className="sub-component-header">Carried Alchemica Panel</h1>
          <div className="row-2">
            <CarriedAlchemicaPanel alchemica={{ fud: 13.231, kek: 100, alpha: 23.1241, fomo: 0 }} maxCapacity={250} total={250} />
            <CarriedAlchemicaPanel alchemica={{ fud: 13.231, kek: 100, alpha: 23.1241, fomo: 0 }} maxCapacity={250} total={250} color="yellow" />
          </div>
          <hr />
          <h1 className="sub-component-header">Settings Menu + Quit Game Modal</h1>
          <SettingsMenu />
          <QuitGameModal open={quitGameModalOpen} onClose={() => setQuitGameModalOpen(false)} />
          <hr />

          <h1 className="sub-component-header">Users Wallet</h1>
          <WalletToggle address="0x7121CBdA61e025EB6639Cd797F63aad30F270680" network="mumbai" onClick={null} />

          <hr />
          <h1 className="sub-component-header">Map</h1>
          <Minimap />

          <hr />
          <h1 className="sub-component-header">Chat Box</h1>
          <ChatBox />

          <h1 className="sub-component-header">Parcel Dashboard</h1>
          <Button
            onClick={() => {
              uiDispatch({
                type: 'UPDATE_PARCEL_DASHBOARD',
                parcelDashboardState: { open: true, altarId: 'C-64-88-H_16_0_0_0_0' },
              });
            }}
          >
            Open Parcel Dashboard
          </Button>
          <ParcelDashboard />

          <hr />

          <h1 className="sub-component-header">Harvester Modal</h1>

          <Button
            onClick={() => {
              uiDispatch({
                type: 'UPDATE_HARVESTER_STATE',
                harvesterState: { open: true, installationId: 'C-64-88-H_10_0_0_0_0', aaltarId: 'C-64-88-H_10_0_0_0_0' },
              });
            }}
          >
            Open Harvester Modal
          </Button>
          <HarvesterModal />
          <hr />
          <h1 className="sub-component-header">Reservoir Modal</h1>
          <Button
            onClick={() => {
              uiDispatch({
                type: 'UPDATE_RESERVOIR_STATE',
                reservoirState: { open: true, installationId: 'C-64-88-H_10_0_0_0_0', aaltarId: 'C-64-88-H_10_0_0_0_0' },
              });
            }}
          >
            Open Reservoir Modal
          </Button>
          <ReservoirModal />

          <hr />

          <h1 className="sub-component-header">Upgrade Modal</h1>
          <Button onClick={() => uiDispatch({ type: 'UPDATE_UPGRADE_MODAL', upgradeModal: { open: true, installationId: 'C-48-76-H_1_6_0_0' } })}>
            Open Upgrade Modal
          </Button>
          <UpgradeModal />

          <hr />
          <h1 className="sub-component-header">Maaker Modal</h1>
          <Button onClick={() => uiDispatch({ type: 'UPDATE_MAAKER_MODAL', maakerModal: { open: true, installationId: 'C-48-76-H_127_0_0_0' } })}>
            MaakerModal
          </Button>
          <MaakerModal />

          <hr />
          <h1 className="sub-component-header">Crafting Table</h1>
          <Button onClick={() => setCraftingTableOpen(true)}>Open Crafting table</Button>
          <CraftingTable open={craftingMenuOpen} onClose={() => setCraftingTableOpen(false)} />
          {/* <CraftingGlitter show={true} /> */}
          <hr />

          <h1 className="sub-component-header">Withdraw Station</h1>
          <Button onClick={() => uiDispatch({ type: 'UPDATE_DIALOG_MODAL_OPEN', withdrawDialogState: true, alchemica: [0, 0, 0, 0], depositId: 0 })}>
            Open Channel Alchemica
          </Button>
          <WithdrawStation />

          <hr />
          <h1 className="sub-component-header">Access Rights Modal</h1>
          <Button
            onClick={() =>
              uiDispatch({
                type: 'UPDATE_ACCESS_RIGHTS_STATE',
                accessRightsState: {
                  open: true,
                  altarId: 'C-64-88-H_16_0_0_0_0',
                },
              })
            }
          >
            Open Access Rights Modal
          </Button>
          <AccessRightsModal />

          <hr />
          <h1 className="sub-component-header">Active Events Modal</h1>
          <Button
            onClick={() =>
              uiDispatch({
                type: 'UPDATE_ACTIVE_EVENTS_MODAL',
                activeEventsModal: {
                  open: true,
                },
              })
            }
          >
            Open Active Events Modal
          </Button>
          <ActiveEventsModal />

          <hr />
          <h1 className="sub-component-header">Event Hologram</h1>
          <Button
            onClick={() =>
              uiDispatch({
                type: 'UPDATE_EVENT_HOLOGRAM',
                eventHologramState: {
                  open: true,
                  installationId: 'C-8032-1776-R_145_0_10_0_0',
                },
              })
            }
          >
            Event Hologram
          </Button>
          <EventHologram />

          <hr />
          <h1 className="sub-component-header">Event Modal</h1>
          <Button
            onClick={() =>
              uiDispatch({
                type: 'UPDATE_EVENTS_MODAL',
                eventsModal: {
                  open: true,
                  installationId: 'C-708-1792-U_145_0_10_0_0',
                },
              })
            }
          >
            Event Modal
          </Button>
          <EventModal />

          <hr />

          <h1 className="sub-component-header">ExitAarena Modal</h1>
          <Button
            onClick={() => {
              uiDispatch({
                type: 'UPDATE_EXIT_ARENA_MODAL',
                exitArenaModal: {
                  open: true,
                  isDead: false,
                },
              });
            }}
          >
            Exit Aarena
          </Button>
          <ExitArenaModal />

          <hr />
          <h1 className="sub-component-header">Aarena Lobby</h1>
          <AarenaLobby />

          <hr />

          <h1 className="sub-component-header">In Game Leaderboard</h1>
          <div className="relative w-full h-24">
            <Leaderboard layout="ingame" />
          </div>

          <h1 className="sub-component-header">Exit Aarena Leaderboard</h1>
          <Leaderboard layout="exit" />

          <hr />
          <div className="flex gap-20">
            <div>
              <h1 className="sub-component-header">Token Manager</h1>
              <div style={{ width: '39rem' }}>
                <TokenManager toggle={() => console.log('toggle')} onClose={() => console.log('close')} />
              </div>
            </div>
            <div>
              <h1 className="sub-component-header">Wallet Activity</h1>
              <div style={{ width: '39rem' }}>
                <WalletActivity toggle={() => console.log('toggle')} />
              </div>
            </div>
          </div>

          <hr />
          <h1 className="sub-component-header">Potion</h1>
          <div className="flex-row gap-20">
            {AVAILABLE_SHOP_ITEMS.map((item: ShopItem) => (
              <ShopItemElement item={item} quantity={100} count={1} key={item.itemTypeId} onChange={(count: number) => null} />
            ))}

            <ShopItemElement item="coming" />
          </div>
          <hr />
          <h1 className="sub-component-header">Item Shop</h1>
          <ItemShopButton open toggle={() => console.log('toggle item shop button')} />
          <ItemShopButton open={false} toggle={() => console.log('toggle item shop button')} />
        </section>

        <section className="component-section">
          <h1 className="section-header">Sections</h1>
          <div className="grid grid-cols-2">
            <div>
              <h1 className="sub-component-header">Spawn Selector(Event)</h1>
              <Button onClick={() => setSpawnSelectorType('EVENT')}>Open Spawn Selector</Button>
              {spawnSelectorType === 'EVENT' && (
                <SpawnSelector
                  onClose={() => setSpawnSelectorType('')}
                  handleSelect={(id) => alert(`Spawn at: ${id}`)}
                  type="EVENTS"
                  selectedSpawn=""
                />
              )}
            </div>
            <div>
              <h1 className="sub-component-header">Spawn Selector(PARCEL)</h1>
              <Button
                onClick={() => {
                  if (!currentAccount) {
                    showNotification(notificationDispatch, {
                      type: 'warning',
                      title: 'Warning',
                      message: 'Please connnect wallet',
                    });
                  } else {
                    setSpawnSelectorType('PARCEL');
                  }
                }}
              >
                Open Spawn Selector
              </Button>
              {spawnSelectorType === 'PARCEL' && (
                <SpawnSelector
                  onClose={() => setSpawnSelectorType('')}
                  handleSelect={(id) => alert(`Spawn at: ${id}`)}
                  type="PARCELS"
                  selectedSpawn=""
                />
              )}
            </div>
          </div>
        </section>

        <section className="component-section">
          <h1 className="section-header">Notifications</h1>
          <h1 className="sub-component-header">Notification stack</h1>
          <NotificationStack />
          <div className="row-3">
            <Button
              onClick={() =>
                showNotification(notificationDispatch, {
                  type: 'success',
                  title: 'Success',
                  message: 'Example success message',
                })
              }
            >
              Success
            </Button>
            <Button
              secondary
              onClick={() =>
                showNotification(notificationDispatch, {
                  type: 'info',
                  title: 'Info',
                  message: 'Example info message',
                })
              }
            >
              Info
            </Button>
            <Button
              onClick={() =>
                showNotification(notificationDispatch, {
                  type: 'error',
                  title: 'Error',
                  message: 'Example error message',
                })
              }
            >
              Error
            </Button>
            <Button
              secondary
              onClick={() =>
                showNotification(notificationDispatch, {
                  type: 'warning',
                  title: 'Warning',
                  message: 'Example warning message',
                })
              }
            >
              Warning
            </Button>
          </div>
          <hr />
          <h1 className="sub-component-header">Transaction Notification stack</h1>
          {transactionNotificationId ? (
            <div className="row-2">
              <Button
                onClick={() => {
                  updateTransactionNotificationStatus(notificationDispatch, transactionNotificationId, 'success');
                  setTransactionNotificationId(undefined);
                }}
              >
                Success
              </Button>
              <Button
                onClick={() => {
                  updateTransactionNotificationStatus(notificationDispatch, transactionNotificationId, 'error', "Because you're dumb");
                  setTransactionNotificationId(undefined);
                }}
              >
                Error
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                updateTransactionNotificationStatus(notificationDispatch, transactionNotificationId, 'error', "Because you're dumb");
                setTransactionNotificationId(undefined);
              }}
            >
              Error
            </Button>
          )}
        </section>

        <section className="component-section">
          <h1 className="section-header">Widgets</h1>
          <h1 className="sub-component-header">Approval Modal</h1>
          <Button onClick={() => setApprovalModalOpen(true)}>Approval Modal</Button>
          {approvalModalOpen && (
            <ApprovalNeeded
              contractName="tileDiamond"
              approved={{ fud: false, fomo: false, alpha: false, kek: false, gltr: false }}
              handleApproved={() => null}
              open={true}
              onClose={() => setApprovalModalOpen(false)}
            />
          )}
        </section>
        <style jsx>{`
          .bg {
            background: #8e2de2; /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #8e2de2, #4a00e0);
            max-height: 100vh;
            width: 100%;
            padding: 3.2rem;
          }
          hr {
            margin-bottom: 2.4rem;
          }
          .component-section {
            max-width: 104rem;
            width: 100%;
            margin: 1.2rem auto 5.4rem;
          }
          .component-section .row,
          .component-section .row-2,
          .component-section .row-3 {
            display: grid;
            gap: 0.8rem;
          }

          .component-section .row {
            grid-template-columns: repeat(4, 1fr);
          }
          .component-section .row-2 {
            grid-template-columns: repeat(2, 1fr);
          }
          .component-section .row-3 {
            grid-template-columns: repeat(3, 1fr);
          }

          .component-section .section-header,
          .component-section .component-header {
            font-size: 6.4rem;
            color: white;
            position: relative;
          }
          .component-section .component-header {
            font-size: 5.2rem;
            color: white;
            position: relative;
          }
          .component-section .section-header:after,
          .component-section .component-header:after {
            content: '';
            position: absolute;
            height: 0.3rem;
            bottom: 0;
            width: 100%;
            background-color: white;
            left: 0;
          }
          .component-section .component-header:after {
            height: 0.1rem;
          }
          .component-section .sub-component-header {
            font-size: 3.2rem;
            color: white;
          }
        `}</style>
      </div>
    </>
  );
};

// or getServerSideProps
export function getStaticProps() {
  return {
    // returns the default 404 page with a status code of 404 in production
    props: {},
    notFound: process.env.APP_ENV === 'production',
  };
}

export default ComponentLibrary;
