/**
 * Project: Mr. Zinger Website
 * Developer: Razi Sultan
 * Purpose: Fetch menu data from JSON and render it dynamically
 */

async function loadMenu() {
    const menuContainer = document.getElementById('menu-container');

    // إظهار رسالة تحميل بسيطة (اختياري)
    menuContainer.innerHTML = '<p class="text-center w-100">جاري تحضير المنيو...</p>';

    try {
        // جلب البيانات من الملف
        const response = await fetch('data.json');

        if (!response.ok) {
            throw new Error('فشل في تحميل ملف البيانات');
        }

        const menuData = await response.json();

        // مسح الحاوية قبل الإضافة
        menuContainer.innerHTML = '';

        // إنشاء الكروت ديناميكياً
        menuData.forEach(item => {
            const cardHtml = `
                <div class="col">
                    <div class="food-card h-100">
                        <div class="food-img-top">
                            <img src="${item.image}" alt="${item.name}" loading="lazy" 
                                 onerror="this.src='images/default-food.jpg'">
                        </div>
                        <div class="p-4 text-center">
                            <h3 class="h4">${item.name}</h3>
                            <span class="price-badge">${item.price} ل.د</span>
                            <p class="text-secondary small mb-0">${item.description}</p>
                        </div>
                    </div>
                </div>
            `;
            menuContainer.innerHTML += cardHtml;
        });

    } catch (error) {
        console.error("حدث خطأ:", error);
        menuContainer.innerHTML = `
            <div class="text-center w-100 py-5">
                <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
                <p>عذراً، تعذر تحميل المنيو حالياً. يرجى المحاولة لاحقاً.</p>
            </div>
        `;
    }
}

// تشغيل الدالة فور تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', loadMenu);