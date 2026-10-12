
import { Component, signal } from '@angular/core';

interface HeroCard {
  eyebrow: string;
  title: string;
  description: string;
}

interface HeroSlide {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  credit: string;
  cards: [HeroCard, HeroCard];
}

@Component({
  selector: 'app-landing-hero',
  standalone: true,
  templateUrl: './landing-hero.html',
  styleUrl: './landing-hero.css',
})
export class LandingHero {
  protected readonly activeIndex = signal(0);

  protected readonly slides: HeroSlide[] = [
    {
      eyebrow: 'EXPERIENCIAS QUE GENERAN CONFIANZA',
      title: 'Alquilar también es construir reputación.',
      description:
        'HouseKarma conecta experiencias reales de alquiler con la confianza que generan.',
      cta: 'Descubre HouseKarma',
      image: '/images/hero/image1-hero-housekarma.jpg',
      credit: 'Warren Hansen',
      cards: [
        {
          eyebrow: 'REPUTACIÓN',
          title: '4.8',
          description: 'Transparente y trazable',
        },
        {
          eyebrow: 'EXPERIENCIAS',
          title: 'Finalizada',
          description: 'Lista para valorar',
        },
      ],
    },
    {
      eyebrow: 'UNA HISTORIA COMPARTIDA',
      title: 'Cada experiencia cuenta.',
      description:
        'Inquilinos y caseros pueden valorar su experiencia después de finalizar un alquiler.',
      cta: 'Cómo funciona',
      image: '/images/hero/image2-hero-housekarma.jpg',
      credit: 'Dima Solomin',
      cards: [
        {
          eyebrow: 'INQUILINO + VIVIENDA + CASERO',
          title: 'Experiencia',
          description: 'Un alquiler con principio y final',
        },
        {
          eyebrow: 'DESPUÉS',
          title: 'Valoración',
          description: 'La experiencia crea reputación',
        },
      ],
    },
    {
      eyebrow: 'PERFILES CON HISTORIA',
      title: 'Conoce a las personas detrás del alquiler.',
      description:
        'Consulta perfiles y reputaciones antes de comenzar una nueva experiencia.',
      cta: 'Conoce la plataforma',
      image: '/images/hero/image3-hero-housekarma.jpg',
      credit: 'HouseKarma',
      cards: [
        {
          eyebrow: 'PERFIL VERIFICADO',
          title: 'Elena M.',
          description: 'Inquilina · 7 experiencias',
        },
        {
          eyebrow: 'CONFIANZA',
          title: 'Excelente',
          description: 'Comunicación 4.9/5',
        },
      ],
    },
    {
      eyebrow: 'TU HISTORIA DE ALQUILER',
      title: 'Tu reputación habla antes que tú.',
      description:
        'Construye una reputación basada en experiencias reales.',
      cta: 'Crear cuenta',
      image: '/images/hero/image4-hero-housekarma.jpg',
      credit: 'HouseKarma',
      cards: [
        {
          eyebrow: 'TU REPUTACIÓN',
          title: '4.9 / 5',
          description: 'Transparente y trazable',
        },
        {
          eyebrow: 'VALORACIONES',
          title: '18',
          description: 'Basadas en experiencias finalizadas',
        },
      ],
    },
  ];

  protected readonly currentSlide = () =>
    this.slides[this.activeIndex()];

  protected next(): void {
    this.activeIndex.update((index) => (index + 1) % this.slides.length);
  }

  protected previous(): void {
    this.activeIndex.update(
      (index) => (index - 1 + this.slides.length) % this.slides.length,
    );
  }

  protected goTo(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.activeIndex.set(index);
    }
  }

  protected onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;

    if (image.dataset['fallbackApplied'] === 'true') {
      image.classList.add('image-unavailable');
      return;
    }

    image.dataset['fallbackApplied'] = 'true';
    image.src = '/images/hero/image1-hero-housekarma.jpg';
  }
}
