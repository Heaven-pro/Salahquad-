import type { StaticImageData } from 'next/image';

import groupThreeImage from '@/lib/groupe 3.JPG';
import twoBuggyImage from '@/lib/2 buggy.png';
import twoCrossImage from '@/lib/2 cross.png';
import fourQuadsImage from '@/lib/4 quads.png';
import crosseeImage from '@/lib/crossee.JPG';
import crossAndBuggyImage from '@/lib/cross et buggy.JPG';
import instagramProfilImage from '@/lib/instagram/profil.jpeg';
import instagramShot1Image from '@/lib/instagram/instagram-1.jpeg';
import instagramShot2Image from '@/lib/instagram/instagram-2.jpeg';
import instagramShot3Image from '@/lib/instagram/instagram-3.jpeg';
import instagramShot4Image from '@/lib/instagram/instagram-4.jpeg';
import instagramShot5Image from '@/lib/instagram/instagram-5.jpeg';
import instagramShot6Image from '@/lib/instagram/instagram-6.jpeg';

export type GalleryEntry =
  | { kind: 'profile'; url: string; label: string }
  | { kind: 'embed'; url: string; label: string };

export type LocalGalleryImage = {
  kind: 'image';
  src: StaticImageData;
  title: string;
  description: string;
};

export type LocalGalleryVideo = {
  kind: 'video';
  src: string;
  title: string;
  description: string;
};

export type InstagramHighlight = {
  kind: 'image';
  src: StaticImageData;
  title: string;
  description: string;
  href: string;
};

const publicGalleryVideo = (name: string) => `/gallery/${encodeURIComponent(name)}`;

export const localGalleryImages: LocalGalleryImage[] = [
  {
    kind: 'image',
    src: fourQuadsImage,
    title: 'Quad en groupe',
    description: 'Sortie conviviale dans la Palmeraie de Marrakech.',
  },
  {
    kind: 'image',
    src: twoBuggyImage,
    title: 'Buggy sur sable',
    description: 'Buggy 1000cc sur sable, ambiance aventure et vitesse.',
  },
  {
    kind: 'image',
    src: twoCrossImage,
    title: 'Cross en circuit',
    description: 'Cross moto sur circuit privé, avec encadrement.',
  },
  {
    kind: 'image',
    src: crosseeImage,
    title: 'Action tout-terrain',
    description: 'Séquence dynamique dans le désert et sur les pistes.',
  },
  {
    kind: 'image',
    src: crossAndBuggyImage,
    title: 'Cross et buggy',
    description: 'Deux univers réunis sur une même scène d’action.',
  },
  {
    kind: 'image',
    src: groupThreeImage,
    title: 'Sortie en équipe',
    description: 'Moments partagés avec l’équipe sur le terrain et les pistes.',
  },
];

export const localGalleryVideos: LocalGalleryVideo[] = [
  {
    kind: 'video',
    src: publicGalleryVideo('Groupe 1.MOV'),
    title: 'Convoi en piste',
    description: 'Vidéo de groupe sur les pistes de Marrakech.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('groupe 2.MOV'),
    title: 'Départ du groupe',
    description: 'Séquence locale en mouvement et en file.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('touriste.MOV'),
    title: 'Accueil des visiteurs',
    description: 'Arrivée et découverte de l’activité.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('jmal.MOV'),
    title: 'Balade au Jmal',
    description: 'Balade et ambiance du parcours.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('netoyage.MOV'),
    title: 'Préparation des machines',
    description: 'Préparation et entretien des machines.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('crosser.MOV'),
    title: 'Session cross',
    description: 'Cross en action sur circuit.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('drift.MOV'),
    title: 'Drift contrôlé',
    description: 'Glisse et sensations fortes.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('cros.MOV'),
    title: 'Run cross',
    description: 'Séquence cross courte et dynamique.',
  },
  {
    kind: 'video',
    src: publicGalleryVideo('camel.MOV'),
    title: 'Pause chameau',
    description: 'Moment chameau inclus dans l’offre.',
  },
];

export const instagramHighlights: InstagramHighlight[] = [
  {
    kind: 'image',
    src: instagramProfilImage,
    title: 'Profil Instagram',
    description: 'Présentation du compte officiel Salah Quad Marrakech.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot1Image,
    title: 'Publication Instagram 1',
    description: 'Aperçu du contenu Instagram officiel.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot2Image,
    title: 'Publication Instagram 2',
    description: 'Capture d’une publication vidéo du compte.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot3Image,
    title: 'Reel Instagram 3',
    description: 'Aperçu d’un reel sur les quads en action.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot4Image,
    title: 'Reel Instagram 4',
    description: 'Moment sunset en quad dans la Palmeraie.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot5Image,
    title: 'Reel Instagram 5',
    description: 'Aperçu d’une sortie en groupe sur la piste.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
  {
    kind: 'image',
    src: instagramShot6Image,
    title: 'Reel Instagram 6',
    description: 'Session en quad et ambiance désert.',
    href: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==',
  },
];

export const instagramEntries: GalleryEntry[] = [
  { kind: 'profile', url: 'https://www.instagram.com/quad_marrakech_salah?igsh=MWVqa3M5NDB2cDY5Zg==', label: 'Compte Instagram' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CuwwLOvtO8C/?igsh=ZDF5aHFnZ21iOWc5', label: 'Publication Instagram 2' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CuwwHEctLWg/?igsh=YXQzcmh4dmZuenM=', label: 'Publication Instagram 3' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C2104-LIixS/?igsh=OXN4M3dzOG0wMXhy', label: 'Reel Instagram 4' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1tzekDIHGc/?igsh=dGEwa25vbHV5aHMw', label: 'Publication Instagram 5' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1jvSlsojKj/?igsh=YzBiZnlyMjNzcjhm', label: 'Publication Instagram 6' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1baidroTSz/?igsh=MWxpeHUydjI1dDluYg==', label: 'Publication Instagram 7' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1bafGFoczN/?igsh=MWw3czBsZzVoanQ3bw==', label: 'Publication Instagram 8' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1bVe2WIPrY/?igsh=MjM3d3IyMjJmYWtw', label: 'Publication Instagram 9' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1Zo6d3IxY2/?igsh=dHBrd2dpN3Y5a2kz', label: 'Publication Instagram 10' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZoxFfokFN/?igsh=MTJ1cmJ6a2JmZ3NsZA==', label: 'Publication Instagram 11' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C1ZomOYojwX/?igsh=dTJjZXAwZDljNjI3', label: 'Reel Instagram 12' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZGhtloEs0/?igsh=bmx0aWlraDkzZXRp', label: 'Publication Instagram 13' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C1ZGcq-o4Qq/?igsh=MWoyeDdlaXY0aHY4bA==', label: 'Reel Instagram 14' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZGXWnIVeD/?igsh=MWk0MHY0cXYwaHJkaQ==', label: 'Publication Instagram 15' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZGGj5IYW9/?igsh=MjNoZ2c0enRqcGx5', label: 'Publication Instagram 16' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZF7rVI_-c/?igsh=cnpteWZiOHV5a25u', label: 'Publication Instagram 17' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C1ZFnJJIagA/?igsh=MTIyaXc4NzNhZG5vYQ==', label: 'Reel Instagram 18' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C1ZFGBAI1vg/?igsh=a2ZxY3BobHJtZ3Ix', label: 'Reel Instagram 19' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZFY43oI9P/?igsh=dzVzcTAzbnQ2YjVl', label: 'Publication Instagram 20' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZFNwzo8NO/?igsh=M25hazd6czI0dDM1', label: 'Publication Instagram 21' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZFIJQooKc/?igsh=MWY2djkzZmw0eDkyaQ==', label: 'Publication Instagram 22' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/C1ZBwq4o6p4/?igsh=MWVucjBzNXhnZWEwcw==', label: 'Reel Instagram 23' },
  { kind: 'embed', url: 'https://www.instagram.com/p/C1ZBrmTIcXO/?igsh=MWoydDRpb2VwdXh3ag==', label: 'Publication Instagram 24' },
  { kind: 'embed', url: 'https://www.instagram.com/reel/Cuww2tgulGC/?igsh=NzdlYWdvNDU0ZWxs', label: 'Reel Instagram 25' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CuwwSPHtRMW/?igsh=cXEwZTNlaXpycXhj', label: 'Publication Instagram 26' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CuwwOu1NATj/?igsh=MWdmZDdwcDFlY2NyaQ==', label: 'Publication Instagram 27' },
  { kind: 'embed', url: 'https://www.instagram.com/p/Ci4MKE_qcuY/?igsh=dTU1YWJwcTQ3ZXlx', label: 'Publication Instagram 28' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CivgUOfsdos/?igsh=MWk3emtldTE2Z2lzYw==', label: 'Publication Instagram 29' },
  { kind: 'embed', url: 'https://www.instagram.com/p/CivdS92sSEo/?igsh=MWRlZXU4bmxwZDZueQ==', label: 'Publication Instagram 30' },
];

export const instagramEmbedUrl = (url: string) => {
  const match = url.match(/instagram\.com\/(p|reel)\/([^/#]+)/i);
  return match ? `https://www.instagram.com/${match[1]}/${match[2]}/embed/` : url;
};
