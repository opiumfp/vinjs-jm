import type { SocialIcon } from '@/types/content';

interface Props {
  socialIconsData: { items: SocialIcon[] };
}

export default function SocialIcons({ socialIconsData }: Props) {
  return (
    <ul className="social-icons list-unstyled navbar-nav">
      {socialIconsData.items.map((item, index) => (
        <li key={index} className="social-icons_item nav-item">
          {item.active && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="social-icons_link nav-link"
              href={item.src}
            >
              <i className={item.icon}></i>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
