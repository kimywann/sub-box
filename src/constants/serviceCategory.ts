import { ServiceCategory } from '@/types/service';

export const SERVICES: ServiceCategory = {
  OTT: [
    { name: 'Netflix', image: new URL('@/assets/images/ott/Netflix.png', import.meta.url).href },
    { name: 'Tving', image: new URL('@/assets/images/ott/Tving.png', import.meta.url).href },
    { name: 'Wavve', image: new URL('@/assets/images/ott/Wavve.png', import.meta.url).href },
    { name: 'Watcha', image: new URL('@/assets/images/ott/Watcha.png', import.meta.url).href },
    { name: 'Laftel', image: new URL('@/assets/images/ott/Laftel.png', import.meta.url).href },
    { name: 'Disney+', image: new URL('@/assets/images/ott/Disney.png', import.meta.url).href },
    { name: 'AppleTV+', image: new URL('@/assets/images/ott/AppleTV+.jpeg', import.meta.url).href },
    { name: 'PrimeVideo', image: new URL('@/assets/images/ott/PrimeVideo.png', import.meta.url).href },
  ],
  MUSIC: [
    { name: 'YoutubeMusic', image: new URL('@/assets/images/music/YoutubeMusic.png', import.meta.url).href },
    { name: 'AppleMusic', image: new URL('@/assets/images/music/AppleMusic.jpeg', import.meta.url).href },
    { name: 'Spotify', image: new URL('@/assets/images/music/Spotify.png', import.meta.url).href },
    { name: 'Melon', image: new URL('@/assets/images/music/Melon.png', import.meta.url).href },
    { name: 'Genie', image: new URL('@/assets/images/music/Genie.png', import.meta.url).href },
    { name: 'Bugs', image: new URL('@/assets/images/music/Bugs.jpeg', import.meta.url).href },
    { name: 'VIBE', image: new URL('@/assets/images/music/Vibe.jpeg', import.meta.url).href },
    { name: 'FLO', image: new URL('@/assets/images/music/Flo.png', import.meta.url).href },
  ],
  AI: [
    { name: 'ChatGPT', image: new URL('@/assets/images/ai/ChatGPT.png', import.meta.url).href },
    { name: 'Claude', image: new URL('@/assets/images/ai/Claude.png', import.meta.url).href },
    { name: 'Copilot', image: new URL('@/assets/images/ai/Copilot.jpeg', import.meta.url).href },
    { name: 'Cursor', image: new URL('@/assets/images/ai/Cursor.jpeg', import.meta.url).href },
    { name: 'Perplexity', image: new URL('@/assets/images/ai/Perplexity.jpeg', import.meta.url).href },
  ],
  ETC: [
    { name: 'Naver멤버십', image: new URL('@/assets/images/etc/NaverMembership.png', import.meta.url).href },
    { name: 'Kakao멤버십', image: new URL('@/assets/images/etc/KakaoMembership.png', import.meta.url).href },
    { name: '배민클럽+', image: new URL('@/assets/images/etc/WoowaBros.jpeg', import.meta.url).href },
    { name: '쿠팡와우+', image: new URL('@/assets/images/etc/Coupang.jpeg', import.meta.url).href },
    { name: 'Toss프라임', image: new URL('@/assets/images/etc/TossPrime.png', import.meta.url).href },
  ],
};
