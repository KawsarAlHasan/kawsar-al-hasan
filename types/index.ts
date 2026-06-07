export interface SocialLink {
  label: string;
  href: string;
  icon: string; // icon name reference
}

export interface HeroData {
  name: string;
  firstName: string;
  lastName: string;
  tagline: string;
  roles: string[];
  bio: string;
  availability: boolean;
  availabilityText: string;
  ctaPrimary: {
    label: string;
    href: string;
  };
  ctaSecondary: {
    label: string;
    href: string;
  };
  socialLinks: SocialLink[];
  techBadges: string[];
}
