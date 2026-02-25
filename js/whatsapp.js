window.GODS_LAND_WA = '2348000000000';

window.buildWhatsAppLink = function buildWhatsAppLink(listing, action = 'enquiry') {
  const actionText = action === 'inspection' ? 'book an inspection for' : 'make an enquiry about';
  const msg = `Hello God's Land, I'd like to ${actionText} ${listing.title} (ID: ${listing.id}). Location: ${listing.state}, ${listing.lga}. Price: ${listing.price ? '₦' + listing.price.toLocaleString() : 'On Request'}. Link: ${window.location.origin}/listing.html?id=${listing.id}`;
  return `https://wa.me/${window.GODS_LAND_WA}?text=${encodeURIComponent(msg)}`;
};
