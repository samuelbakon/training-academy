<template>
    <div class="carrousel-box">
        <div class="carrousel-items">
            <div id="1" v-if="currentSlide === 1" class="carrousel-item">
                <img src="https://ici.exploratv.ca/upload/cms/fichiers/2023/Blogue/Chat-2.jpg" alt="">
            </div>
            <div id="2" v-if="currentSlide === 2" class="carrousel-item">
                <img src="https://ici.exploratv.ca/upload/cms/fichiers/2023/Blogue/Chat-1.jpg" alt="">
            </div>
            <div id="3" v-if="currentSlide === 3" class="carrousel-item">
                <img src="https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.webp" alt="">
            </div>
            <div id="4" v-if="currentSlide === 4" class="carrousel-item">
                <img src="https://www.lesrecettesdedaniel.fr/modules/prestablog/views/img/grid-for-1-7/up-img/131.jpg" alt="">
            </div>
            <div id="5" v-if="currentSlide === 5" class="carrousel-item">
                <img src="https://sevetys.fr/_next/image/?url=https%3A%2F%2Fcharming-angel-5ca83bf286.media.strapiapp.com%2FChat_europeen_573af6e71d.webp&w=3840&q=75" alt="">
            </div>
            <div id="6" v-if="currentSlide === 6" class="carrousel-item">
                <img src="https://media.cdnws.com/_i/169659/21556/2490/56/chats-preferes.jpeg" alt="">
            </div>
        </div>
        <div class="carrousel-controls">
            <button @click="previousSlide">Previous</button>
            <button @click="nextSlide">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    
    const currentSlide = ref(1);
    const slideDirection = ref("left");

    function nextSlide() {
        currentSlide.value++;
        slideDirection.value = "left";
        animateSLide();
    }

    function previousSlide() {
        currentSlide.value--;
        slideDirection.value = "right";
        animateSLide();
    }

    function animateSLide() {
        const currentElement = document.getElementById(currentSlide.value.toString())
        if (currentElement) {
            currentElement.classList.add(slideDirection.value);
        }
    }
    
    // Initialize the carousel
    onMounted(() => {
        animateSLide();
    });
</script>

<style>

.carrousel-box {
    width: 600px;
    display: flex;
    flex-direction: column;
    margin: auto;
    overflow: hidden;
}

.carrousel-items {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.carrousel-item {
    width: 100%;
    height: 100%;
    overflow: hidden;
    order: 2;
}

.carrousel-item.left {
    animation: slideInLeft 0.5s ease-in-out;
}

.carrousel-item.right {
    animation: slideInRight 0.5s ease-in-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.carrousel-item img {
    position: relative;
    width: 600px;
    height: 400px;
    object-fit: cover;
}
    
</style>