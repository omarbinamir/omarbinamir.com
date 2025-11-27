
<button onclick="
const sites=[
  'https://www.forbes.com',
  'https://www.linkedin.com',
  'https://www.entrepreneur.com',
  'https://www.businessinsider.com',
  'https://www.inc.com',
  'https://www.shopify.com',
  'https://www.hubspot.com',
  'https://www.bloomberg.com',
  'https://www.fiverr.com',
  'https://www.upwork.com'
];
let index=Math.floor(Math.random()*sites.length);
document.getElementById('result').innerHTML='<a href=&quot;'+sites[index]+'&quot; target=&quot;_blank&quot;>'+sites[index]+'</a>';
">Random Business Website</button>