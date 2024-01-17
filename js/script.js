// Seleciona os elementos HTML relevantes
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Inicializa a variável de pesquisa de Pokémon
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon da API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Função assíncrona para renderizar os detalhes do Pokémon na interface
const renderPokemon = async (pokemon) => {

  // Define o conteúdo inicial enquanto aguarda os dados
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Busca os dados do Pokémon
  const data = await fetchPokemon(pokemon);

  // Verifica se os dados foram obtidos com sucesso
  if (data) {
    // Atualiza a interface com os dados do Pokémon
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    // Exibe mensagem de Pokémon não encontrado se os dados não foram obtidos
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Adiciona ouvintes de evento para os botões de navegação
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Renderiza o Pokémon inicial ao carregar a página
renderPokemon(searchPokemon);
