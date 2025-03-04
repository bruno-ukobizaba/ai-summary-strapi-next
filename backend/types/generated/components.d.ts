import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_components_faq_items';
  info: {
    description: 'A frequently asked question and its answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsFeature extends Struct.ComponentSchema {
  collectionName: 'components_components_features';
  info: {
    description: '';
    displayName: 'Feature';
  };
  attributes: {
    heading: Schema.Attribute.String;
    icon: Schema.Attribute.Enumeration<
      ['CLOCK_ICON', 'CHECK_ICON', 'CLOUD_ICON']
    >;
    subHeading: Schema.Attribute.Text;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    description: '';
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ComponentsService extends Struct.ComponentSchema {
  collectionName: 'components_components_services';
  info: {
    description: 'Individual service offering';
    displayName: 'Service';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      [
        'CODE_ICON',
        'GLOBE_ICON',
        'SHIELD_ICON',
        'CHART_ICON',
        'USERS_ICON',
        'SETTINGS_ICON',
      ]
    >;
    link: Schema.Attribute.Component<'components.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_components_testimonials';
  info: {
    description: 'A customer testimonial';
    displayName: 'Testimonial';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    role: Schema.Attribute.String;
  };
}

export interface LayoutFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_faq_sections';
  info: {
    description: 'A section displaying frequently asked questions';
    displayName: 'FAQ Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    faqs: Schema.Attribute.Component<'components.faq-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutFeaturesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_features_sections';
  info: {
    description: '';
    displayName: 'Features Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    feature: Schema.Attribute.Component<'components.feature', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: '';
    displayName: 'Footer';
  };
  attributes: {
    copyrightText: Schema.Attribute.String;
    legalLinks: Schema.Attribute.Component<'components.link', true>;
    logoText: Schema.Attribute.Component<'components.link', false>;
    socialMediaLinks: Schema.Attribute.Component<'components.link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    description: '';
    displayName: 'Header';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'components.link', false>;
    logoText: Schema.Attribute.Component<'components.link', false>;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'components.link', false>;
    subHeading: Schema.Attribute.Text;
  };
}

export interface LayoutServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_services_sections';
  info: {
    description: 'A section to showcase the services offered';
    displayName: 'Services Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    services: Schema.Attribute.Component<'components.service', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_testimonials_sections';
  info: {
    description: 'A section displaying customer testimonials';
    displayName: 'Testimonials Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Component<'components.testimonial', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.faq-item': ComponentsFaqItem;
      'components.feature': ComponentsFeature;
      'components.link': ComponentsLink;
      'components.service': ComponentsService;
      'components.testimonial': ComponentsTestimonial;
      'layout.faq-section': LayoutFaqSection;
      'layout.features-section': LayoutFeaturesSection;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero-section': LayoutHeroSection;
      'layout.services-section': LayoutServicesSection;
      'layout.testimonials-section': LayoutTestimonialsSection;
    }
  }
}
