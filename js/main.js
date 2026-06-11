const proveedores = document.querySelector("#proveedores");

if (proveedores) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                proveedores.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(proveedores);
}