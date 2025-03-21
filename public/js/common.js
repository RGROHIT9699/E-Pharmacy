const likeBtn = document.querySelectorAll('.like-btn')

async function likeButton(productId,btn) {
    try {
        let response = await axios({
            method: 'post',
            url : `/product/${productId}/like`,
            headers:{'X-Requested-With':'XMLHttpRequest'},
        });

        if(btn.children[0].classList.contains("fas")) {
            btn.children[0].classList.remove("fas");
            btn.children[0].classList.add("far");
        } else {
            btn.children[0].classList.remove("far");
            btn.children[0].classList.add("fas");
        }
    }
    catch (e) {
        window.location.replace('/signin');
    }
}

for(let btn of likeBtn) {
    btn.addEventListener('click',()=>{
        let productId = btn.getAttribute('product-id');
        likeButton(productId,btn);
    })
}