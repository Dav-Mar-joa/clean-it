// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('.toggle-btn').forEach(button => {
//     button.addEventListener('click', function() {
//       const content = this.nextElementSibling;
//       content.classList.toggle('active');
//       console.log('Le bouton a été cliqué');
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.toggle-btn').forEach(button => {
    const onglet = button.textContent.trim().toLowerCase();
    const content = button.nextElementSibling;

    // Restaure l'état à partir du localStorage
    const visible = localStorage.getItem(`onglet-${onglet}`);
    if (visible === 'true') {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }

    button.addEventListener('click', function() {
      content.classList.toggle('active');
      const isVisible = content.classList.contains('active');
      localStorage.setItem(`onglet-${onglet}`, isVisible); // Sauvegarde l'état
      console.log(`Onglet ${onglet} est ${isVisible ? 'visible' : 'caché'}`);
    });
  });
});
