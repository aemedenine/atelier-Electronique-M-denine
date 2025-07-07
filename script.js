// الوقت والتاريخ
function updateTime() {
  const now = new Date();
  const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('current-time').textContent = `${day} ${date} ${month} - ${hours}:${minutes}`;
}

// عداد الزيارات
function updateVisits() {
  let visits = localStorage.getItem('visit-count');
  visits = visits ? parseInt(visits) + 1 : 1;
  localStorage.setItem('visit-count', visits);
  document.getElementById('visit-count').textContent = `عدد الزيارات: ${visits}`;
}

// أخبار BBC
fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.bbci.co.uk/arabic/rss.xml')
  .then(response => response.json())
  .then(data => {
    const newsItems = data.items.slice(0, 4);
    const newsText = newsItems.map(item => `📰 ${item.title}`).join(' ⚡ ');
    document.getElementById('live-news').textContent = newsText;
  })
  .catch(err => {
    document.getElementById('live-news').textContent = '❌ فشل تحميل الأخبار.';
  });

updateTime();
updateVisits();
setInterval(updateTime, 60000);

