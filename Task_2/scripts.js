document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.Type button');

    buttons.forEach(button => {
        const parentSection = button.closest('.Type');
        const bgColor = window.getComputedStyle(parentSection).backgroundColor;

        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = '#FFFFFF';
            button.style.color = bgColor;
            button.style.fontWeight = 'bold'
            
        });

        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = 'transparent';
            button.style.color = '#FFFFFF';
            button.style.fontWeight = 'normal';
        });
    });
});
