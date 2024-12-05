document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelectorAll('.filter-input').forEach(input => {
            input.classList.add('hidden');
        });
        const filterId = filter.dataset.filter + '-filter';
        document.getElementById(filterId).classList.remove('hidden');
    });
});