let usuarios = [];

fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(data => {
        console.log('usuario 1: ', data[1])
        usuarios = data;
        const tabla = document.getElementById('inyectarDatos');
        usuarios.slice(0, 5).forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="userId">${usuario.id}</td>
                <td class="userName">${usuario.name}</td>
                <td>${usuario.email}</td>`;
            tabla.appendChild(row);
        });
    });

    document.getElementById('inyectarDatos').addEventListener('click', (event) => {
        const target = event.target.closest('tr');
        if (!target) return;
    
        const userId = target.querySelector('.userId').textContent;
    
        const usuario = usuarios.find(user => user.id === parseInt(userId));
        mostrarDatosUsuario(usuario);
        mostrarPostsUsuario(usuario.id);
    });
    
function mostrarDatosUsuario(usuario) {
    const fichaUsuario = document.getElementById('fichaUsuario');
    fichaUsuario.innerHTML = `
        <h2>Ficha usuario</h2>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${usuario.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">ID: ${usuario.id}</h6>
                <p><strong>Email: </strong>${usuario.email}</p>
                <p><strong>Dirección: </strong>${usuario.address ? `${usuario.address.street}, ${usuario.address.suite}, ${usuario.address.city}, ${usuario.address.zipcode}` : 'No disponible'}</p>
                <p><strong>Compañía: </strong>${usuario.company ? usuario.company.name : 'No disponible'}</p>
                <p><strong>Teléfono: </strong>${usuario.phone}</p>
                <p><strong>Nombre de usuario: </strong>${usuario.username}</p>
                <p><strong>Sitio web: </strong>${usuario.website}</p>
            </div>
        </div>`;
}


function mostrarPostsUsuario(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(resp => resp.json())
        .then(posts => {
            const postList = document.getElementById('postureo');
            postList.innerHTML = ''; // Limpiar la lista antes de añadir nuevos posts
            posts.slice(0, 5).forEach(post => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
                listItem.innerHTML = `
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">${post.title}</div>
                        ${post.body}
                    </div>
                    <span class="badge bg-primary rounded-pill">ID: ${post.id}</span>`;
                listItem.addEventListener('click', () => {
                    mostrarComentariosPost(post.id);
                });
                postList.appendChild(listItem);
            });
        });
}

function mostrarComentariosPost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(resp => resp.json())
        .then(comments => {
            const comentariosDiv = document.getElementById('comentariosPost');
            comentariosDiv.innerHTML = '<h3>Comentarios del post</h3>';
            const commentsList = document.createElement('ul');
            commentsList.classList.add('list-group');

            comments.slice(0, 5).forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.classList.add('list-group-item');
                commentItem.innerHTML = `
                    <h5>${comment.name}</h5>
                    <h6 class="text-muted">${comment.email}</h6>
                    <p>${comment.body}</p>`;
                commentsList.appendChild(commentItem);
            });

            comentariosDiv.appendChild(commentsList);
        });
}