import { ServiceCategory } from '@/types/service';

export const SERVICES: ServiceCategory = {
  OTT: [
    { name: 'Netflix', image: '/src/assets/images/ott/Netflix.png' },
    { name: 'Tving', image: '/src/assets/images/ott/Tving.png' },
    { name: 'Wavve', image: '/src/assets/images/ott/Wavve.png' },
    { name: 'Watcha', image: '/src/assets/images/ott/Watcha.png' },
    { name: 'Laftel', image: '/src/assets/images/ott/Laftel.png' },
    { name: 'Disney+', image: '/src/assets/images/ott/Disney.png' },
    { name: 'AppleTV+', image: '/src/assets/images/ott/AppleTV+.jpeg' },
    { name: 'PrimeVideo', image: '/src/assets/images/ott/PrimeVideo.png' },
  ],
  MUSIC: [
    { name: 'YoutubeMusic', image: '/src/assets/images/music/YoutubeMusic.png' },
    { name: 'AppleMusic', image: '/src/assets/images/music/AppleMusic.jpeg' },
    { name: 'Spotify', image: '/src/assets/images/music/Spotify.png' },
    { name: 'Melon', image: '/src/assets/images/music/Melon.png' },
    { name: 'Genie', image: '/src/assets/images/music/Genie.png' },
    { name: 'Bugs', image: '/src/assets/images/music/Bugs.jpeg' },
    { name: 'VIBE', image: '/src/assets/images/music/Vibe.jpeg' },
    { name: 'FLO', image: '/src/assets/images/music/Flo.png' },
  ],
  AI: [
    { name: 'ChatGPT', image: '/src/assets/images/ai/ChatGPT.png' },
    { name: 'Claude', image: '/src/assets/images/ai/Claude.png' },
    { name: 'Copilot', image: '/src/assets/images/ai/Copilot.jpeg' },
    { name: 'Cursor', image: '/src/assets/images/ai/Cursor.jpeg' },
    { name: 'Perplexity', image: '/src/assets/images/ai/Perplexity.jpeg' },
  ],
  ETC: [
    { name: 'Naver멤버십', image: '/src/assets/images/etc/NaverMembership.png' },
    { name: 'Kakao멤버십', image: '/src/assets/images/etc/KakaoMembership.png' },
    { name: '배민클럽+', image: '/src/assets/images/etc/WoowaBros.jpeg' },
    { name: '쿠팡와우+', image: '/src/assets/images/etc/Coupang.jpeg' },
    { name: 'Toss프라임', image: '/src/assets/images/etc/TossPrime.png' },
  ],
};
