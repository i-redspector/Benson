export interface SocialUpdate {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'x' | 'youtube';
  content: string;
  date: string;
  stats: string;
  handle: string;
  image?: string;
}

// Simulating API latency
const MOCK_DELAY = 600;

const POST_VARIATIONS: Record<string, Omit<SocialUpdate, 'date' | 'stats'>[]> = {
  linkedin: [
    {
      platform: 'linkedin',
      handle: 'Benson Global Inc.',
      content: "Honored to announce our strategic alliance with Victory Hill Capital. A new era of regenerative infrastructure investment begins today. #BensonGlobal #PrivateMarkets",
    },
    {
      platform: 'linkedin',
      handle: 'Benson Global Inc.',
      content: "Dr. Anthony Benson speaking at the Global Wealth Forum: 'The future of capital is not just growth, it's resilience.' Read the full transcript.",
    },
    {
        platform: 'linkedin',
        handle: 'Benson Global Inc.',
        content: "Welcoming our new Managing Partner, Dr. Tiaan Oosthuizen. Strengthening our institutional footprint across EMEA.",
    }
  ],
  instagram: [
    {
      platform: 'instagram',
      handle: '@bensonglobal',
      content: "Behind the scenes at the TG4 Athlete Wealth Summit in Qatar. Building legacies beyond the game. 🌍🏆 #WealthArchitecture",
      image: "https://picsum.photos/300/200?random=1"
    },
    {
        platform: 'instagram',
        handle: '@bensonglobal',
        content: "Site visit: The new regenerative energy grid in Namibia. Capital in action. ☀️⚡️ #GreenEnergy #BensonGlobal",
        image: "https://picsum.photos/300/200?random=2"
    },
    {
        platform: 'instagram',
        handle: '@bensonglobal',
        content: "Precision in every detail. Our annual investor gala in London. #Luxury #Finance #Global",
        image: "https://picsum.photos/300/200?random=3"
    }
  ],
  facebook: [
    {
      platform: 'facebook',
      handle: 'Benson Global',
      content: "Community update: Benson Global expands educational initiatives in Ghana. Empowering the next generation of leaders through strategic capital deployment.",
    },
    {
        platform: 'facebook',
        handle: 'Benson Global',
        content: "Join us next week for a live webinar on Family Office Governance structures with Kavis Reed. Register now via the link in bio.",
    },
    {
        platform: 'facebook',
        handle: 'Benson Global',
        content: "Celebrating 5 years of partnership with Falcon Ireland. Here's to many more milestones.",
    }
  ],
  x: [
    {
      platform: 'x',
      handle: '@BensonGlobal',
      content: "Market Volatility is noise. Strategy is signal. Read Dr. Benson's latest brief on the Africa-Euro growth corridor. 📉📈",
    },
    {
        platform: 'x',
        handle: '@BensonGlobal',
        content: "Just in: Public market pillars showing resilience amidst global shifts. Our Q3 outlook is live. #Finance #Investments",
    },
    {
        platform: 'x',
        handle: '@BensonGlobal',
        content: "Sustainable investing isn't a trend, it's the standard. #RegenerativeCapital #BGI",
    }
  ],
  youtube: [
    {
      platform: 'youtube',
      handle: 'Benson Global TV',
      content: "NEW VIDEO: The Regenerative Capital Thesis (Keynote 2025). Watch Dr. Tiaan Oosthuizen break down the transition economy.",
      image: "https://picsum.photos/300/200?random=4"
    },
    {
        platform: 'youtube',
        handle: 'Benson Global TV',
        content: "Client Stories: How the TG4 ecosystem is redefining athlete retirement planning.",
        image: "https://picsum.photos/300/200?random=5"
    },
    {
        platform: 'youtube',
        handle: 'Benson Global TV',
        content: "Market Watch: Q4 Global Infrastructure Outlook with our Chief Investment Officer.",
        image: "https://picsum.photos/300/200?random=6"
    }
  ]
};

// Helper to randomize stats for "Live" feel
const getRandomStats = (platform: string) => {
  const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
  
  switch (platform) {
    case 'linkedin': return `${r(500, 2500)} likes • ${r(20, 150)} comments`;
    case 'instagram': return `${r(800, 6000)} likes`;
    case 'facebook': return `${r(200, 1500)} likes • ${r(5, 50)} shares`;
    case 'x': return `${r(20, 150)} Retweets • ${r(100, 800)} Likes`;
    case 'youtube': return `${r(2, 80)}k views`;
    default: return `${r(100, 1200)} likes`;
  }
};

const getRandomTime = () => {
  const times = ['Just now', '1m ago', '5m ago', '12m ago', '34m ago', '1h ago', '2h ago'];
  return times[Math.floor(Math.random() * times.length)];
};

export const getLatestSocialUpdate = async (platform: string): Promise<SocialUpdate> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const variations = POST_VARIATIONS[platform] || POST_VARIATIONS.linkedin;
      // Pick a random post to simulate a dynamic feed
      const base = variations[Math.floor(Math.random() * variations.length)];
      
      resolve({
        ...base,
        date: getRandomTime(),
        stats: getRandomStats(platform)
      } as SocialUpdate);
    }, MOCK_DELAY);
  });
};