# 🥕 Tiziana Distribuidora Online

> **Sistema de gestión y comercialización de frutas y verduras en línea**

## 📋 Descripción General

**Tiziana Distribuidora Online** es una plataforma web moderna para una distribuidora mayorista y minorista de frutas y verduras ubicada en **3 de Febrero, Buenos Aires**. El sistema permite a clientes y vendedores gestionar productos, consultar catálogos y realizar pedidos de forma eficiente.

Con más de **15 años de trayectoria** abasteciendo comercios y familias, Tiziana pone a disposición una solución digital que mejora la experiencia de compra y acelera los procesos de distribución.

---

## 🎯 A quién va dirigido

### Usuarios Principales:

- **👥 Clientes Minoristas**: Comercios locales, almacenes y pequeños negocios que necesitan abastecerse de productos frescos en pequeñas cantidades
- **👥 Clientes Mayoristas**: Supermercados, restaurantes, empresas de catering y distribuidores que requieren volúmenes mayores
- **👨‍💼 Administradores**: Personal de Tiziana encargado de gestionar el inventario y catalogs de productos

---

## ✨ Características Principales

### Frontend
- ✅ **Interfaz moderna y responsive** con Tailwind CSS y diseño mobile-first
- ✅ **Navegación intuitiva** con menú sticky y acceso rápido
- ✅ **Hero section** con información destacada de la empresa
- ✅ **Catálogos descargables** en PDF (Minorista y Mayorista)
- ✅ **Integración WhatsApp** para pedidos directos
- ✅ **Sección de productos** (en desarrollo)
- ✅ **Información de la empresa** (Nosotros)
- ✅ **Formulario de contacto** (en desarrollo)

### Backend
- ✅ **API REST en PHP** para gestión de productos
- ✅ **Base de datos MySQL** con estructura optimizada
- ✅ **Sistema de categorización** de productos
- ✅ **Precios diferenciados** minorista/mayorista
- ✅ **Gestión de productos destacados**
- ✅ **Soporte para imágenes** de productos

---

## 🏗️ Estructura del Proyecto

```
Tiziana-Online/
├── index.html                    # Página principal
├── database.sql                  # Schema de base de datos
│
├── assets/                       # Recursos multimedia
│   ├── logo.jpg                 # Logo de la empresa
│   ├── minorista.pdf            # Catálogo para minoristas
│   ├── mayorista.pdf            # Catálogo para mayoristas
│   └── provedor/               # Imágenes de proveedores
│
├── css/
│   └── styles.css               # Estilos personalizados
│
├── js/
│   └── main.js                  # Lógica principal del frontend
│
└── php/
    ├── conexion.php             # Conexión a base de datos
    ├── productos.php            # API de productos
    └── pedidos.php              # Sistema de pedidos (en desarrollo)
```

---

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **HTML5** | Latest | Estructura semántica |
| **CSS3 + Tailwind** | 3.x | Diseño responsive |
| **JavaScript** | ES6+ | Interactividad frontend |
| **PHP** | 7.4+ | Backend y APIs |
| **MySQL** | 5.7+ | Base de datos |
| **Unsplash API** | Latest | Imágenes de stock |

---

## 📝 Cambios Realizados

### v1.0.0 - Lanzamiento Inicial

#### Backend
- ✅ Creación de estructura base de datos MySQL
- ✅ Desarrollo de API en PHP para gestión de productos
- ✅ Conexión segura a base de datos
- ✅ Endpoints para consulta de productos
- ✅ Sistema de categorización por tipo de producto

#### Frontend
- ✅ Diseño responsive con Tailwind CSS
- ✅ Header sticky con navegación principal
- ✅ Hero section con call-to-action
- ✅ Integración WhatsApp Business (+54 11 3823-0491)
- ✅ Carga de catálogos PDF descargables
- ✅ Logo y branding de Tiziana
- ✅ Secciones: Productos, Nosotros, Contacto

#### UX/Diseño
- ✅ Paleta de colores: Rojo corporativo (#8b0000, #dc2626)
- ✅ Tipografía: Fuente Poppins de Google Fonts
- ✅ Animaciones suaves y transiciones
- ✅ Iconografía moderna

#### Infraestructura
- ✅ Versión control con Git
- ✅ Estructura modular y escalable
- ✅ Optimización de velocidad de carga
- ✅ Soporte para imágenes responsivas

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- PHP 7.4 o superior
- MySQL 5.7 o superior
- Servidor web (Apache, Nginx, etc.)
- Navegador moderno (Chrome, Firefox, Edge)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/Tiziana-Online.git
   cd Tiziana-Online
   ```

2. **Crear base de datos**
   ```bash
   mysql -u root -p < database.sql
   ```

3. **Configurar conexión** (`php/conexion.php`)
   ```php
   $host = "localhost";
   $user = "root";      // Tu usuario MySQL
   $pass = "";          // Tu contraseña MySQL
   $db = "tiziana";
   ```

4. **Desplegar en servidor web**
   - Copiar archivos a la raíz del servidor web
   - Asegurar permisos de lectura/escritura en carpetas `assets/` y `php/`

5. **Acceder a la aplicación**
   - Abrir en navegador: `http://localhost/Tiziana-Online`

---

## 💻 API Endpoints

### GET Productos
```
GET /php/productos.php
```
**Descripción**: Obtiene lista completa de productos

**Respuesta (JSON)**:
```json
[
  {
    "id": 1,
    "nombre": "Tomate",
    "categoria": "Verduras",
    "precio_minorista": 45.50,
    "precio_mayorista": 38.00,
    "imagen": "tomate.jpg",
    "destacado": true
  }
]
```

---

## 🔒 Seguridad

- ✅ Validación de entrada en servidor
- ✅ Protección contra SQL Injection
- ✅ Conexión segura a base de datos
- ✅ CORS configurado para APIs

### Mejoras Futuras Recomendadas:
- [ ] Autenticación con JWT
- [ ] Encriptación de contraseñas
- [ ] HTTPS en producción
- [ ] Rate limiting en APIs

---

## 📊 Base de Datos

### Tabla: `productos`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT | Identificador único (PK, Auto-increment) |
| `nombre` | VARCHAR(255) | Nombre del producto |
| `categoria` | VARCHAR(255) | Categoría (Verduras, Frutas, etc.) |
| `precio_minorista` | DECIMAL(10,2) | Precio para clientes minoristas |
| `precio_mayorista` | DECIMAL(10,2) | Precio para clientes mayoristas |
| `imagen` | TEXT | URL de la imagen del producto |
| `destacado` | BOOLEAN | Indica si es producto destacado |

---

## 📱 Contacto y Soporte

- **WhatsApp**: [+54 11 3823-0491](https://wa.me/541138230491)
- **Ubicación**: 3 de Febrero, Buenos Aires
- **Horario**: Consultar con la empresa

---

## 📈 Roadmap Futuro

### Próximas Versiones
- [ ] **v1.1**: Sistema completo de pedidos online
- [ ] **v1.2**: Carrito de compras funcional
- [ ] **v1.3**: Panel de administración para gestión de productos
- [ ] **v1.4**: Sistema de pagos integrado (Mercado Pago, PayPal)
- [ ] **v1.5**: App móvil nativa (iOS/Android)
- [ ] **v2.0**: Sistema de suscripción para pedidos recurrentes

---

## 👥 Equipo

- **Concepto**: Tiziana Distribuidora
- **Desarrollo**: [Tu nombre/Equipo]
- **Diseño**: [Diseñador]
- **Marketing**: [Responsable]

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

---

## 🙋 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar bugs o solicitar features, abre un [Issue](https://github.com/tu-usuario/Tiziana-Online/issues) en el repositorio.

---

**Última actualización**: Junio 2026  
**Versión Actual**: 1.0.0  
**Estado**: ✅ Producción Inicial

---

> 🌱 *Tiziana Distribuidora: Frutas y verduras frescas todos los días*
