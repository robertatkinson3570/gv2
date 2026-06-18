import { CompanyLogo } from 'assets';
import { gotchiverseLinks } from 'data/links';
import Image from 'next/image';
import styles from './styles';
export const Footer = (): JSX.Element => {
  const sections = [
    {
      key: 'aavegotchi',
      label: 'Aavegotchi',
      links: [
        {
          name: 'aavegotchi',
          label: 'Aavegotchi',
        },
        {
          name: 'ghst',
          label: 'Get GHST',
        },
        {
          name: 'baazar',
          label: 'Gotchi Baazaar',
        },
        {
          name: 'brand',
          label: 'Brand Kit',
        },
        {
          name: 'white_paper',
          label: 'White Paper',
        },
      ],
    },
    {
      key: 'governance',
      label: 'Governance',
      links: [
        {
          name: 'forum',
          label: 'Forum',
        },
        {
          name: 'treasury',
          label: 'Treasury',
        },
        {
          name: 'vote',
          label: 'Vote',
        },
      ],
    },
    {
      key: 'social',
      label: 'Join Us',
      links: [
        {
          name: 'discord',
          label: 'Discord',
        },
        {
          name: 'twitter',
          label: 'Twitter',
        },
        {
          name: 'youtube',
          label: 'Youtube',
        },
        {
          name: 'telegram',
          label: 'Telegram',
        },
        {
          name: 'reddit',
          label: 'Reddit',
        },
      ],
    },
  ];
  return (
    <>
      <footer className="footer-container">
        <div className="logo-container hidden md:flex">
          <Image alt="" src={CompanyLogo} layout="fill" />
        </div>
        <div className="grid grid-cols-2 gap-x-20 gap-y-10 lg:grid-cols-4">
          <div className="company-info">
            <div className="copyright">
              <div className="heading">Pixelcraft Studios</div>
              <div className="legal">
                2023 Pixelcraft Studios Pte. Ltd. <br />
                All rights reserved.
              </div>
            </div>
            <div className="section">
              <a className="link" href="https://www.aavegotchi.com/policy/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>
              <a className="link" href="https://www.aavegotchi.com/policy/terms" target="_blank" rel="noreferrer">
                Terms of Service
              </a>
            </div>
          </div>
          {sections.map(({ key, label, links }, index) => (
            <div className="section" key={index}>
              <div className="heading">{label}</div>
              {links.map(({ name, label }, index) => (
                <a key={index} href={gotchiverseLinks[key][name]} target="_blank" rel="noreferrer" className="link">
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </footer>
      <style jsx>{styles}</style>
    </>
  );
};
