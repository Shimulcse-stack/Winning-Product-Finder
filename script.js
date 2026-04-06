
// ─── PRODUCT DATA ───────────────────────────────────────────────────────────
// Replace or extend this list with your own products!
const PRODUCTS = {
  health: {
    icon: '💊',
    name: 'Collagen Supplement Powder',
    cost: 8,
    price: 29,
    action: [
      'Source from a local supplement supplier or Alibaba — MOQ is usually 50–100 units.',
      'Create a simple brand label (Canva works great) and list on Daraz or Facebook Shop.',
      'Post 3 "before & after" type reels per week on TikTok & Instagram targeting women 25–45.',
      'Offer a bundle deal: buy 2 get 1 free to boost average order value.',
      'Collect customer reviews after the first 20 sales and use them in future ads.'
    ]
  },
  beauty: {
    icon: '✨',
    name: 'Jade Face Roller Set',
    cost: 5,
    price: 22,
    action: [
      'Order samples from a supplier first — quality matters in beauty.',
      'Set up a clean Instagram page with aesthetic flat-lay photos (phone camera is fine).',
      'Target women via Facebook/Instagram ads with a $5–10/day test budget.',
      'Offer free shipping on orders over a threshold to increase cart value.',
      'Partner with 2–3 micro-influencers (5K–20K followers) for unboxing content.'
    ]
  },
  fitness: {
    icon: '🏋️',
    name: 'Resistance Band Set (5-pack)',
    cost: 6,
    price: 24,
    action: [
      'Source bands in bulk — look for sets with a carry pouch for perceived value.',
      'Film quick 60-second workout tutorials using the bands to post daily on TikTok.',
      'List on Daraz, Shajgoj, or your own Shopify with clear size/resistance chart.',
      'Create a free "7-Day Home Workout" PDF to include with every order.',
      'Run retargeting ads to people who visited your listing but didn\'t buy.'
    ]
  },
  home: {
    icon: '🏠',
    name: 'Bamboo Kitchen Organizer Set',
    cost: 7,
    price: 26,
    action: [
      'Find a reliable supplier — check that bamboo is real and not veneer.',
      'Take lifestyle photos showing a neat, organized kitchen countertop.',
      'Target newlyweds and new homeowners on Facebook Ads (life event targeting).',
      'Bundle with a smaller item (spice rack or cutting board) for upsell.',
      'List on multiple platforms: Daraz, Chaldal, Facebook Marketplace.'
    ]
  },
  tech: {
    icon: '🎧',
    name: 'Magnetic Phone Mount (Car + Desk)',
    cost: 4,
    price: 18,
    action: [
      'Order a mixed sample of 5–10 units to test quality before bulk ordering.',
      'Film a simple demo video showing it working in a car and on a desk.',
      'Sell in tech Facebook groups and on Daraz with fast shipping promise.',
      'Create a combo listing: phone mount + cable organizer for higher margin.',
      'Respond to all buyer questions within 1 hour — speed builds trust fast.'
    ]
  },
  pets: {
    icon: '🐾',
    name: 'Slow Feeder Dog Bowl',
    cost: 5,
    price: 20,
    action: [
      'Source BPA-free bowls — this is a key selling point for pet owners.',
      'Post adorable videos of dogs using the bowl — these go viral easily.',
      'Target dog owners in local Facebook pet groups with a soft-sell post.',
      'Offer a 30-day "happy pet" guarantee to reduce purchase hesitation.',
      'Bundle with a pet water bottle for an easy upsell opportunity.'
    ]
  },
  kids: {
    icon: '🧸',
    name: 'Montessori Wooden Puzzle Set',
    cost: 6,
    price: 24,
    action: [
      'Ensure all pieces are sanded smooth with non-toxic paint — safety first.',
      'Target parents of toddlers (ages 1–4) on Facebook and Instagram.',
      'Create a post showing child development benefits — educational angle sells.',
      'Gift packaging option: add a ribbon box for Eid/birthday gifting.',
      'Reach out to local kindergartens and daycares for bulk orders.'
    ]
  },
  fashion: {
    icon: '👜',
    name: 'Minimalist Leather Card Wallet',
    cost: 5,
    price: 22,
    action: [
      'Source slim RFID-blocking wallets — it\'s a strong selling feature.',
      'Photograph on clean white background + lifestyle (in hand, in pocket).',
      'Target professionals and students as a birthday or graduation gift.',
      'Offer free name engraving for first 50 orders to create buzz.',
      'Run a "Gift for Him/Her" campaign around Eid, Valentine\'s, and year-end.'
    ]
  }
};

// ─── LOGIC ──────────────────────────────────────────────────────────────────
function findProduct() {
  const target = parseFloat(document.getElementById('targetProfit').value);
  const budget = parseFloat(document.getElementById('budget').value) || null;
  const niche  = document.getElementById('niche').value;

  if (!target || target <= 0) {
    alert('Please enter a target monthly profit.');
    return;
  }
  if (!niche) {
    alert('Please select a niche.');
    return;
  }

  const p = PRODUCTS[niche];
  const profitPerUnit = p.price - p.cost;
  const unitsNeeded   = Math.ceil(target / profitPerUnit);
  const perDay        = Math.ceil(unitsNeeded / 30);
  const costTotal     = unitsNeeded * p.cost;

  // Populate product card
  document.getElementById('productIcon').textContent  = p.icon;
  document.getElementById('productName').textContent  = p.name;
  document.getElementById('productNicheLabel').textContent = nicheLabel(niche) + ' niche';
  document.getElementById('costVal').textContent      = '$' + p.cost;
  document.getElementById('priceVal').textContent     = '$' + p.price;
  document.getElementById('profitVal').textContent    = '$' + profitPerUnit;

  // Units
  document.getElementById('unitsNum').textContent    = unitsNeeded.toLocaleString();
  document.getElementById('unitsPerDay').textContent = `≈ ${perDay} sale${perDay !== 1 ? 's' : ''} per day`;

  // Budget warning
  const warn = document.getElementById('budgetWarning');
  if (budget && budget < costTotal) {
    warn.style.display = 'block';
    warn.textContent = `⚠️ You'll need ~$${costTotal.toLocaleString()} to stock ${unitsNeeded} units, but your budget is $${budget.toLocaleString()}. Consider starting with ${Math.floor(budget / p.cost)} units (~$${(Math.floor(budget / p.cost) * profitPerUnit).toLocaleString()} profit).`;
  } else {
    warn.style.display = 'none';
  }

  // Action plan
  const ul = document.getElementById('actionSteps');
  ul.innerHTML = p.action.map((s, i) => `
    <li class="step">
      <div class="step-num">${i + 1}</div>
      <div class="step-text">${s}</div>
    </li>`).join('');

  // Show results, hide form
  document.getElementById('formCard').style.display  = 'none';
  const results = document.getElementById('results');
  results.style.display = 'block';

  // Re-trigger animations
  ['productCard','unitsCard','planCard'].forEach((id, i) => {
    const el = document.getElementById(id);
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = '';
    el.style.animationDelay = (i * 0.1) + 's';
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function reset() {
  document.getElementById('formCard').style.display  = '';
  document.getElementById('results').style.display   = 'none';
  document.getElementById('targetProfit').value = '';
  document.getElementById('budget').value = '';
  document.getElementById('niche').value = '';
}

function nicheLabel(key) {
  const map = {
    health:'Health & Wellness', beauty:'Beauty & Skincare',
    fitness:'Fitness & Sports', home:'Home & Kitchen',
    tech:'Tech Accessories', pets:'Pet Products',
    kids:'Kids & Baby', fashion:'Fashion & Accessories'
  };
  return map[key] || key;
}
