window.populateStateAndLga = function populateStateAndLga(stateEl, lgaEl, includeAll = true) {
  if (!stateEl || !lgaEl) return;
  const states = Object.keys(window.NIGERIA_LOCATIONS || {});
  const firstOption = includeAll ? '<option value="">All State</option>' : '<option value="">Select State</option>';
  stateEl.innerHTML = firstOption + states.map(s => `<option value="${s}">${s}</option>`).join('');

  const populateLga = (state) => {
    const lgas = state ? window.NIGERIA_LOCATIONS[state] || [] : [];
    const label = includeAll ? 'All LGA' : 'Select LGA';
    lgaEl.innerHTML = `<option value="">${label}</option>` + lgas.map(l => `<option value="${l}">${l}</option>`).join('');
  };

  populateLga('');
  stateEl.addEventListener('change', () => populateLga(stateEl.value));
};

window.filterListings = function filterListings(data, filters) {
  const q = (filters.q || '').trim().toLowerCase();
  return data.filter(item => {
    const matchQ = !q || [item.title, item.type, item.state, item.lga, item.id].join(' ').toLowerCase().includes(q);
    const matchType = !filters.type || item.type === filters.type;
    const matchState = !filters.state || item.state === filters.state;
    const matchLga = !filters.lga || item.lga === filters.lga;
    return matchQ && matchType && matchState && matchLga;
  });
};
