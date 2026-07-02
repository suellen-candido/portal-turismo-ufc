/* =====================================================
   HORIZONTE TURISMO — JavaScript da Página de Categoria
   Página 2: Listagem de Passeios por Categoria
   Disciplina: Programação Web — UFC Itapajé

   Funcionalidades:
   - Extração do ID da categoria da URL
   - Consumo dinâmico de dados do backend (simulado/mock)
   - Renderização de cards de passeios
   - Navegação para página de detalhes
   - Skeleton loading
   - Tratamento de erros
===================================================== */

document.addEventListener('DOMContentLoaded', function() {

  /* ── CONSTANTES E CONFIGURAÇÕES ──────────────── */
  const API_BASE_URL = '/api';  // Base da API backend
  const USE_MOCK = true;        // true = usa dados mock; false = consome API real

  /* ── DADOS MOCK (simulação do backend) ───────── */
  const categoriasMock = [
    {
      id: 1,
      nome: "Praias",
      descricao: "Descubra as praias mais paradisíacas do Ceará, desde Jericoacoara até Canoa Quebrada.",
      imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1440&h=900&fit=crop"
    },
    {
      id: 2,
      nome: "Trilhas",
      descricao: "Aventure-se pelas trilhas da Chapada do Araripe e Serra de Baturité.",
      imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1440&h=900&fit=crop"
    },
    {
      id: 3,
      nome: "Museus",
      descricao: "Conheça a história e cultura cearense nos museus de Fortaleza e região.",
      imagem: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1440&h=900&fit=crop"
    },
    {
      id: 4,
      nome: "Gastronomia",
      descricao: "Saboreie a autêntica culinária cearense: tapioca, baião de dois e peixada.",
      imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1440&h=900&fit=crop"
    },
    {
      id: 5,
      nome: "Passeios Históricos",
      descricao: "Explore o Centro Histórico de Fortaleza, igrejas coloniais e monumentos.",
      imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1440&h=900&fit=crop"
    }
  ];

  const passeiosMock = {
    1: [  // Praias
      {
        id: 101,
        nome: "Jericoacoara",
        categoria_id: 1,
        localizacao: "Jijoca de Jericoacoara — CE",
        duracao: "1 dia inteiro",
        roteiro: "Saída de Fortaleza com transfer 4x4, visita à Duna do Pôr do Sol, Pedra Furada e Lagoa do Paraíso.",
        pontos_interesse: "Duna do Pôr do Sol, Pedra Furada, Lagoa do Paraíso, Árvore da Preguiça",
        recomendacoes: "Levar protetor solar, óculos de sol, chapéu e água. Melhor época: maio a novembro.",
        valor_estimado: 350.00,
        imagem: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=400&h=300&fit=crop",
        descricao_curta: "A praia mais famosa do Ceará, com dunas, lagoas cristalinas e um pôr do sol inesquecível.",
        avaliacao: 4.9,
        num_avaliacoes: 1240
      },
      {
        id: 102,
        nome: "Canoa Quebrada",
        categoria_id: 1,
        localizacao: "Aracati — CE",
        duracao: "1 dia inteiro",
        roteiro: "Passeio pelas falésias coloridas, passeio de jangada e visita às dunas de Canoa Quebrada.",
        pontos_interesse: "Falésias, Broadway, Duna do Pôr do Sol, Praia de Canoa Quebrada",
        recomendacoes: "Usar roupas leves e confortáveis. Não deixe de experimentar os frutos do mar locais.",
        valor_estimado: 280.00,
        imagem: "https://images.unsplash.com/photo-1520942702018-0865209d747d?w=400&h=300&fit=crop",
        descricao_curta: "Falésias coloridas, dunas douradas e praias de águas mornas no litoral leste do Ceará.",
        avaliacao: 4.8,
        num_avaliacoes: 980
      },
      {
        id: 103,
        nome: "Praia do Futuro",
        categoria_id: 1,
        localizacao: "Fortaleza — CE",
        duracao: "Meio dia",
        roteiro: "Relaxamento nas barracas de praia, banho de mar e gastronomia local à beira-mar.",
        pontos_interesse: "Barracas de praia, Orla da Praia do Futuro, Beach Park (próximo)",
        recomendacoes: "Visitar durante a semana para evitar multidões. Experimente o peixe frito nas barracas.",
        valor_estimado: 120.00,
        imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        descricao_curta: "A praia mais famosa de Fortaleza, com barracas estruturadas e águas calmas.",
        avaliacao: 4.5,
        num_avaliacoes: 2100
      },
      {
        id: 104,
        nome: "Cumbuco",
        categoria_id: 1,
        localizacao: "Caucaia — CE",
        duracao: "1 dia",
        roteiro: "Passeio de buggy pelas dunas, kitesurf e relaxamento na lagoa de Cauipe.",
        pontos_interesse: "Dunas de Cumbuco, Lagoa de Cauipe, Praia de Cumbuco",
        recomendacoes: "Ideal para praticantes de kitesurf. Levar repelente de insetos.",
        valor_estimado: 200.00,
        imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        descricao_curta: "Paraíso dos kitesurfers com dunas impressionantes e lagoas de água doce.",
        avaliacao: 4.6,
        num_avaliacoes: 750
      },
      {
        id: 105,
        nome: "Lagoinha",
        categoria_id: 1,
        localizacao: "Paraipaba — CE",
        duracao: "1 dia inteiro",
        roteiro: "Passeio de jangada pelo Rio Curu, visita às falésias e relaxamento na praia de Lagoinha.",
        pontos_interesse: "Falésias de Lagoinha, Rio Curu, Praia de Lagoinha",
        recomendacoes: "Levar câmera fotográfica. O passeio de jangada é imperdível ao pôr do sol.",
        valor_estimado: 220.00,
        imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        descricao_curta: "Vila de pescadores com falésias espetaculares e passeios de jangada inesquecíveis.",
        avaliacao: 4.7,
        num_avaliacoes: 620
      },
      {
        id: 106,
        nome: "Morro Branco",
        categoria_id: 1,
        localizacao: "Beberibe — CE",
        duracao: "Meio dia",
        roteiro: "Visita às falésias coloridas de Morro Branco, labirinto das falésias e praia.",
        pontos_interesse: "Falésias Coloridas, Labirinto das Falésias, Praia de Morro Branco",
        recomendacoes: "Contratar guia local para o labirinto. Usar calçados confortáveis.",
        valor_estimado: 150.00,
        imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        descricao_curta: "Falésias multicoloridas formando um labirinto natural à beira-mar.",
        avaliacao: 4.6,
        num_avaliacoes: 890
      }
    ],
    2: [  // Trilhas
      {
        id: 201,
        nome: "Serra de Baturité",
        categoria_id: 2,
        localizacao: "Baturité — CE",
        duracao: "1 dia",
        roteiro: "Trilha pela serra, visita às cachoeiras e contemplação da Mata Atlântica.",
        pontos_interesse: "Cachoeira do Riachão, Pico Alto, Parque Ecológico",
        recomendacoes: "Levar tênis de trilha, água e lanches. Verificar clima antes de sair.",
        valor_estimado: 180.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "Trilhas pela serra com cachoeiras, clima ameno e rica biodiversidade.",
        avaliacao: 4.8,
        num_avaliacoes: 540
      },
      {
        id: 202,
        nome: "Chapada do Araripe",
        categoria_id: 2,
        localizacao: "Crato — CE",
        duracao: "1 dia inteiro",
        roteiro: "Trilha pelo Geopark Araripe, visita ao Museu de Paleontologia e cachoeiras.",
        pontos_interesse: "Museu de Paleontologia, Cachoeira do Batateiras, Geopark Araripe",
        recomendacoes: "Usar calçados adequados para trilha. Levar protetor solar e repelente.",
        valor_estimado: 200.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "Patrimônio geológico com fósseis, cachoeiras e trilhas históricas.",
        avaliacao: 4.7,
        num_avaliacoes: 430
      },
      {
        id: 203,
        nome: "Trilha do Pico da Tijuca",
        categoria_id: 2,
        localizacao: "Maranguape — CE",
        duracao: "4 horas",
        roteiro: "Subida ao Pico da Tijuca com vista panorâmica da região metropolitana de Fortaleza.",
        pontos_interesse: "Pico da Tijuca, Vista Panorâmica, Serra de Maranguape",
        recomendacoes: "Subida moderada a difícil. Levar bastante água e lanches energéticos.",
        valor_estimado: 100.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "Desafio de subida com recompensa de vista panorâmica de 360 graus.",
        avaliacao: 4.5,
        num_avaliacoes: 320
      },
      {
        id: 204,
        nome: "Trilha das Cachoeiras de Ubajara",
        categoria_id: 2,
        localizacao: "Ubajara — CE",
        duracao: "1 dia",
        roteiro: "Descida de teleférico e trilhas pelas cachoeiras do Parque Nacional de Ubajara.",
        pontos_interesse: "Parque Nacional de Ubajara, Cachoeira do Cafundó, Teleférico de Ubajara",
        recomendacoes: "Levar roupa de banho e toalha. O teleférico tem fila nos finais de semana.",
        valor_estimado: 160.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "O menor parque nacional do Brasil com cachoeiras exuberantes e teleférico.",
        avaliacao: 4.6,
        num_avaliacoes: 510
      },
      {
        id: 205,
        nome: "Trilha da Serra da Meruoca",
        categoria_id: 2,
        localizacao: "Meruoca — CE",
        duracao: "6 horas",
        roteiro: "Trilha pela serra com visita a grutas, cachoeiras e mirantes naturais.",
        pontos_interesse: "Gruta da Serra, Cachoeira do Mato, Mirante da Serra",
        recomendacoes: "Recomendado para trilheiros experientes. Levar lanterna para as grutas.",
        valor_estimado: 140.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "Aventura entre grutas, cachoeiras e mirantes na Serra da Meruoca.",
        avaliacao: 4.4,
        num_avaliacoes: 280
      },
      {
        id: 206,
        nome: "Trilha Ecológica de Guaramiranga",
        categoria_id: 2,
        localizacao: "Guaramiranga — CE",
        duracao: "3 horas",
        roteiro: "Trilha leve pela mata atlântica com observação de aves e flora nativa.",
        pontos_interesse: "Mata Atlântica, Mirante do Cruzeiro, Cachoeira do Açude",
        recomendacoes: "Ideal para famílias e iniciantes. Levar binóculos para observação de aves.",
        valor_estimado: 90.00,
        imagem: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        descricao_curta: "Trilha leve pela mata atlântica com clima ameno e observação de aves.",
        avaliacao: 4.5,
        num_avaliacoes: 350
      }
    ],
    3: [  // Museus
      {
        id: 301,
        nome: "Centro Dragão do Mar",
        categoria_id: 3,
        localizacao: "Fortaleza — CE",
        duracao: "3 horas",
        roteiro: "Visita ao Museu de Arte Contemporânea, Planetário e Memorial da Cultura Cearense.",
        pontos_interesse: "Museu de Arte Contemporânea, Planetário, Memorial da Cultura Cearense",
        recomendacoes: "Verificar programação de exposições. Fechado às segundas-feiras.",
        valor_estimado: 30.00,
        imagem: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop",
        descricao_curta: "Complexo cultural com museu, planetário e espaços de arte contemporânea.",
        avaliacao: 4.7,
        num_avaliacoes: 1500
      },
      {
        id: 302,
        nome: "Museu do Ceará",
        categoria_id: 3,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Visita guiada pela história do Ceará, desde o período indígena até os dias atuais.",
        pontos_interesse: "Coleção de artefatos indígenas, Acervo histórico, Arquitetura colonial",
        recomendacoes: "Visita guiada gratuita disponível. Ótimo para entender a história local.",
        valor_estimado: 15.00,
        imagem: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop",
        descricao_curta: "Museu histórico com acervo que conta a história do Ceará desde os povos originários.",
        avaliacao: 4.5,
        num_avaliacoes: 890
      },
      {
        id: 303,
        nome: "Museu da Imagem e do Som",
        categoria_id: 3,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Exposições de fotografia, cinema e mídias audiovisuais da cultura cearense.",
        pontos_interesse: "Acervo fotográfico, Exposições temporárias, Cinema",
        recomendacoes: "Verificar programação de mostras de cinema. Entrada gratuita.",
        valor_estimado: 0.00,
        imagem: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop",
        descricao_curta: "Acervo de imagem e som preservando a memória audiovisual do Ceará.",
        avaliacao: 4.3,
        num_avaliacoes: 450
      },
      {
        id: 304,
        nome: "Museu de Arte da UFC",
        categoria_id: 3,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Visita às coleções de arte brasileira e cearense, com obras de Portinari e Di Cavalcanti.",
        pontos_interesse: "Obras de Portinari, Coleção de arte cearense, Exposições temporárias",
        recomendacoes: "Entrada gratuita. Ótima oportunidade para conhecer arte cearense.",
        valor_estimado: 0.00,
        imagem: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=400&h=300&fit=crop",
        descricao_curta: "Acervo de arte brasileira e cearense com obras de grandes mestres.",
        avaliacao: 4.6,
        num_avaliacoes: 380
      },
      {
        id: 305,
        nome: "Casa de José de Alencar",
        categoria_id: 3,
        localizacao: "Fortaleza — CE",
        duracao: "1 hora",
        roteiro: "Visita à casa onde nasceu o escritor José de Alencar, com acervo literário e mobiliário da época.",
        pontos_interesse: "Mobiliário do século XIX, Acervo literário de José de Alencar, Jardim histórico",
        recomendacoes: "Ideal para estudantes e amantes da literatura. Entrada gratuita.",
        valor_estimado: 0.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Casa natal do escritor José de Alencar, preservada como museu literário.",
        avaliacao: 4.4,
        num_avaliacoes: 620
      },
      {
        id: 306,
        nome: "Museu do Cangaço",
        categoria_id: 3,
        localizacao: "Juazeiro do Norte — CE",
        duracao: "2 horas",
        roteiro: "Acervo sobre o cangaço no Nordeste, com fotos, armas e objetos da época de Lampião.",
        pontos_interesse: "Armas do cangaço, Fotos históricas, Figurinos, Documentos da época",
        recomendacoes: "Combine com visita ao Santuário de Padre Cícero. Ótimo para entender a história regional.",
        valor_estimado: 20.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Acervo dedicado à história do cangaço no Nordeste brasileiro.",
        avaliacao: 4.5,
        num_avaliacoes: 410
      }
    ],
    4: [  // Gastronomia
      {
        id: 401,
        nome: "Tour Gastronômico de Fortaleza",
        categoria_id: 4,
        localizacao: "Fortaleza — CE",
        duracao: "4 horas",
        roteiro: "Passeio por restaurantes típicos, mercados e barracas de rua provando a culinária cearense.",
        pontos_interesse: "Mercado dos Peixes, Feirinha da Beira-Mar, Restaurantes típicos",
        recomendacoes: "Vá com fome! Experimente tapioca, baião de dois, peixada e cartola.",
        valor_estimado: 180.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Tour culinário pelos melhores pontos gastronômicos de Fortaleza.",
        avaliacao: 4.7,
        num_avaliacoes: 680
      },
      {
        id: 402,
        nome: "Festival de Peixe e Frutos do Mar",
        categoria_id: 4,
        localizacao: "Fortaleza — CE",
        duracao: "3 horas",
        roteiro: "Degustação de peixes e frutos do mar preparados de diversas formas na culinária cearense.",
        pontos_interesse: "Mercado dos Peixes, Restaurantes de beira-mar, Barracas de praia",
        recomendacoes: "O peixe fresco é a especialidade. Experimente o peixe grelhado com pirão.",
        valor_estimado: 150.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Degustação de peixes frescos e frutos do mar da culinária cearense.",
        avaliacao: 4.6,
        num_avaliacoes: 520
      },
      {
        id: 403,
        nome: "Workshop de Tapioca Cearense",
        categoria_id: 4,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Aula prática de preparo de tapioca com diversos recheios típicos do Ceará.",
        pontos_interesse: "Cozinha prática, Degustação, Receitas tradicionais",
        recomendacoes: "Leve avental e caderno para anotações. Você leva as receitas para casa!",
        valor_estimado: 80.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Aprenda a fazer tapioca cearense com recheios tradicionais e criativos.",
        avaliacao: 4.8,
        num_avaliacoes: 340
      },
      {
        id: 404,
        nome: "Rota das Cachaças Artesanais",
        categoria_id: 4,
        localizacao: "Maranguape — CE",
        duracao: "1 dia",
        roteiro: "Visita a alambiques artesanais com degustação de cachaças cearenses e aprendizado do processo.",
        pontos_interesse: "Alambiques artesanais, Degustação guiada, Processo de fabricação",
        recomendacoes: "Beba com moderação. Leve água e lanches. Não dirija após o tour.",
        valor_estimado: 200.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Tour por alambiques artesanais com degustação de cachaças cearenses.",
        avaliacao: 4.5,
        num_avaliacoes: 290
      },
      {
        id: 405,
        nome: "Feijoada Cearense na Praia",
        categoria_id: 4,
        localizacao: "Aquiraz — CE",
        duracao: "4 horas",
        roteiro: "Experiência gastronômica de feijoada cearense à beira-mar com música ao vivo.",
        pontos_interesse: "Praia do Presídio, Barraca de praia, Música ao vivo",
        recomendacoes: "Reserve com antecedência nos finais de semana. Ótimo para grupos.",
        valor_estimado: 120.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Feijoada cearense à beira-mar com música ao vivo e vista para o mar.",
        avaliacao: 4.6,
        num_avaliacoes: 450
      },
      {
        id: 406,
        nome: "Rota do Baião de Dois",
        categoria_id: 4,
        localizacao: "Quixadá — CE",
        duracao: "1 dia",
        roteiro: "Tour gastronômico pelo interior explorando a origem e variações do baião de dois.",
        pontos_interesse: "Fazendas tradicionais, Cozinha caipira, Degustação de pratos típicos",
        recomendacoes: "Leve roupa confortável. O tour inclui visita a fazendas produtoras de arroz.",
        valor_estimado: 160.00,
        imagem: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
        descricao_curta: "Tour pelo interior cearense explorando a origem do baião de dois.",
        avaliacao: 4.4,
        num_avaliacoes: 310
      }
    ],
    5: [  // Passeios Históricos
      {
        id: 501,
        nome: "Centro Histórico de Fortaleza",
        categoria_id: 5,
        localizacao: "Fortaleza — CE",
        duracao: "3 horas",
        roteiro: "Caminhada guiada pelo Centro Histórico visitando igrejas coloniais, teatros e praças.",
        pontos_interesse: "Catedral Metropolitana, Teatro José de Alencar, Praça do Ferreira, Igreja do Rosário",
        recomendacoes: "Use calçados confortáveis. Leve água e protetor solar. Ótimo para fotos.",
        valor_estimado: 80.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Caminhada guiada pelos principais monumentos históricos de Fortaleza.",
        avaliacao: 4.6,
        num_avaliacoes: 720
      },
      {
        id: 502,
        nome: "Santuário de Padre Cícero",
        categoria_id: 5,
        localizacao: "Juazeiro do Norte — CE",
        duracao: "1 dia inteiro",
        roteiro: "Visita ao Santuário, Capela do Socorro, Estátua de Padre Cícero e Museu Vivo.",
        pontos_interesse: "Santuário de Padre Cícero, Capela do Socorro, Estátua, Museu Vivo",
        recomendacoes: "Respeite o local de fé. Leve água e protetor solar. Ótimo para comprar artesanato.",
        valor_estimado: 250.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Visita ao maior centro de peregrinação do Nordeste, dedicado a Padre Cícero.",
        avaliacao: 4.8,
        num_avaliacoes: 1800
      },
      {
        id: 503,
        nome: "Fortaleza de Nossa Senhora da Assunção",
        categoria_id: 5,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Visita à fortaleza que deu origem à cidade de Fortaleza, com exposições históricas.",
        pontos_interesse: "Muralhas coloniais, Canhões históricos, Exposições do exército",
        recomendacoes: "Entrada gratuita. Ótimo para entender a origem da cidade.",
        valor_estimado: 0.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Fortaleza colonial que deu nome à capital cearense, com exposições militares.",
        avaliacao: 4.4,
        num_avaliacoes: 560
      },
      {
        id: 504,
        nome: "Igreja da Sé e Centro Antigo",
        categoria_id: 5,
        localizacao: "Fortaleza — CE",
        duracao: "2 horas",
        roteiro: "Visita à Catedral Metropolitana e caminhada pelas ruas do centro antigo de Fortaleza.",
        pontos_interesse: "Catedral Metropolitana, Rua Dragão do Mar, Casarões coloniais",
        recomendacoes: "Ideal para fotos de arquitetura colonial. Visite no fim de tarde para melhor luz.",
        valor_estimado: 50.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Tour pela Catedral Metropolitana e casarões coloniais do centro antigo.",
        avaliacao: 4.5,
        num_avaliacoes: 480
      },
      {
        id: 505,
        nome: "Casa de Cultura de Caucaia",
        categoria_id: 5,
        localizacao: "Caucaia — CE",
        duracao: "2 horas",
        roteiro: "Visita à antiga cadeia pública transformada em centro cultural com exposições de arte.",
        pontos_interesse: "Arquitetura colonial, Exposições de arte, Oficinas culturais",
        recomendacoes: "Verifique programação de exposições. Ótimo para conhecer arte local.",
        valor_estimado: 0.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Antiga cadeia pública transformada em vibrante centro cultural.",
        avaliacao: 4.3,
        num_avaliacoes: 290
      },
      {
        id: 506,
        nome: "Rota dos Jesuítas no Ceará",
        categoria_id: 5,
        localizacao: "Sobral — CE",
        duracao: "1 dia inteiro",
        roteiro: "Tour pelas antigas missões jesuíticas, igrejas e sítios arqueológicos da região.",
        pontos_interesse: "Igrejas jesuíticas, Sítios arqueológicos, Museu do Eclipse",
        recomendacoes: "Contrate guia especializado. Leve água e lanches para o trajeto.",
        valor_estimado: 220.00,
        imagem: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
        descricao_curta: "Tour pelas antigas missões jesuítas e sítios históricos do interior cearense.",
        avaliacao: 4.5,
        num_avaliacoes: 340
      }
    ]
  };

  /* ── FUNÇÕES AUXILIARES ────────────────────────── */

  /**
   * Extrai parâmetros da URL (query string)
   * @param {string} param - Nome do parâmetro
   * @returns {string|null} - Valor do parâmetro ou null
   */
  function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  /**
   * Formata valor monetário para exibição
   * @param {number} valor - Valor a formatar
   * @returns {string} - Valor formatado em reais
   */
  function formatarValor(valor) {
    if (valor === 0) return 'Gratuito';
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
  }

  /**
   * Gera estrelas de avaliação em HTML
   * @param {number} avaliacao - Nota de 0 a 5
   * @returns {string} - HTML com estrelas
   */
  function gerarEstrelas(avaliacao) {
    const estrelasCheias = Math.floor(avaliacao);
    const estrelaMeia = (avaliacao - estrelasCheias) >= 0.5 ? 1 : 0;
    const estrelasVazias = 5 - estrelasCheias - estrelaMeia;

    let html = '';
    for (let i = 0; i < estrelasCheias; i++) html += '★';
    if (estrelaMeia) html += '½';
    for (let i = 0; i < estrelasVazias; i++) html += '☆';
    return html;
  }

  /**
   * Renderiza o skeleton loading enquanto carrega os dados
   */
  function renderizarSkeleton() {
    const container = document.getElementById('passeios-container');
    container.innerHTML = '';

    for (let i = 0; i < 6; i++) {
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton-card';
      skeleton.innerHTML = `
        <div class="skeleton-img"></div>
        <div class="skeleton-body">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line medium"></div>
          <div class="skeleton-line long"></div>
          <div class="skeleton-line short"></div>
        </div>
      `;
      container.appendChild(skeleton);
    }
  }

  /**
   * Renderiza os cards de passeios na tela
   * @param {Array} passeios - Array de objetos de passeios
   * @param {Object} categoria - Objeto da categoria atual
   */
  function renderizarPasseios(passeios, categoria) {
    const container = document.getElementById('passeios-container');
    const mensagemErro = document.getElementById('mensagem-erro');

    container.innerHTML = '';

    if (!passeios || passeios.length === 0) {
      container.style.display = 'none';
      mensagemErro.style.display = 'block';
      return;
    }

    container.style.display = 'grid';
    mensagemErro.style.display = 'none';

    passeios.forEach(function(passeio) {
      const card = document.createElement('article');
      card.className = 'passeio-listagem-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', 'Ver detalhes do passeio ' + passeio.nome);

      card.innerHTML = `
        <div class="card-categoria-badge">${categoria.nome}</div>
        <div class="card-img-wrap">
          <img src="${passeio.imagem}" alt="${passeio.nome}" width="400" height="300" loading="lazy">
        </div>
        <div class="card-body">
          <h3 class="card-title">${passeio.nome}</h3>
          <p class="card-local">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${passeio.localizacao}
          </p>
          <p class="card-desc">${passeio.descricao_curta}</p>
          <div class="card-meta">
            <span class="card-duracao">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              ${passeio.duracao}
            </span>
            <span class="card-valor">${formatarValor(passeio.valor_estimado)}</span>
          </div>
          <div class="card-rating" aria-label="Avaliação ${passeio.avaliacao} de 5 estrelas">
            <span class="stars" aria-hidden="true">${gerarEstrelas(passeio.avaliacao)}</span>
            <span class="rating-value">${passeio.avaliacao}</span>
            <span style="font-size: 0.75rem; color: #888;">(${passeio.num_avaliacoes})</span>
          </div>
          <a href="detalhes.html?id=${passeio.id}" class="card-btn">Ver Detalhes</a>
        </div>
      `;

      // Navegação ao clicar no card inteiro
      card.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A') {
          window.location.href = 'detalhes.html?id=' + passeio.id;
        }
      });

      // Navegação com teclado (Enter)
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          window.location.href = 'detalhes.html?id=' + passeio.id;
        }
      });

      container.appendChild(card);
    });
  }

  /**
   * Atualiza as informações do hero com os dados da categoria
   * @param {Object} categoria - Objeto da categoria
   */
  function atualizarHero(categoria) {
    const tituloEl = document.getElementById('nome-categoria');
    const descEl = document.getElementById('desc-categoria');
    const breadcrumbEl = document.getElementById('breadcrumb-categoria');
    const sectionTagEl = document.getElementById('section-tag-categoria');
    const tituloListagemEl = document.getElementById('titulo-listagem');
    const heroBg = document.querySelector('.categoria-hero-bg');

    if (tituloEl) tituloEl.textContent = categoria.nome;
    if (descEl) descEl.textContent = categoria.descricao;
    if (breadcrumbEl) breadcrumbEl.textContent = categoria.nome;
    if (sectionTagEl) sectionTagEl.textContent = categoria.nome + ' Disponíveis';
    if (tituloListagemEl) tituloListagemEl.textContent = categoria.nome;
    if (heroBg) heroBg.style.backgroundImage = 'url(' + categoria.imagem + ')';

    // Atualiza o título da página
    document.title = categoria.nome + ' — Horizonte Turismo';
  }

  /**
   * Busca categoria pelo ID (mock)
   * @param {number} id - ID da categoria
   * @returns {Object|null} - Objeto da categoria ou null
   */
  function buscarCategoriaMock(id) {
    return categoriasMock.find(function(cat) {
      return cat.id === parseInt(id);
    }) || null;
  }

  /**
   * Busca passeios por categoria (mock)
   * @param {number} categoriaId - ID da categoria
   * @returns {Array} - Array de passeios
   */
  function buscarPasseiosMock(categoriaId) {
    return passeiosMock[parseInt(categoriaId)] || [];
  }

  /* ── FUNÇÕES DE API (Backend real) ─────────────── */

  /**
   * Busca categoria pelo ID via API
   * @param {number} id - ID da categoria
   * @returns {Promise<Object>} - Promise com objeto da categoria
   */
  async function buscarCategoriaAPI(id) {
    const response = await fetch(API_BASE_URL + '/categorias/' + id);
    if (!response.ok) throw new Error('Categoria não encontrada');
    return response.json();
  }

  /**
   * Busca passeios por categoria via API
   * @param {number} categoriaId - ID da categoria
   * @returns {Promise<Array>} - Promise com array de passeios
   */
  async function buscarPasseiosAPI(categoriaId) {
    const response = await fetch(API_BASE_URL + '/produtos?categoria_id=' + categoriaId);
    if (!response.ok) throw new Error('Erro ao carregar passeios');
    return response.json();
  }

  /* ── FUNÇÃO PRINCIPAL DE CARREGAMENTO ──────────── */

  /**
   * Inicializa a página de categoria
   */
  async function inicializarPagina() {
    // Extrai o ID da categoria da URL
    const categoriaId = getUrlParam('id');

    if (!categoriaId) {
      document.getElementById('nome-categoria').textContent = 'Categoria não encontrada';
      document.getElementById('desc-categoria').textContent = 
        'Nenhuma categoria foi selecionada. Volte à página inicial e escolha uma categoria.';
      document.getElementById('passeios-container').style.display = 'none';
      document.getElementById('mensagem-erro').style.display = 'block';
      document.getElementById('mensagem-erro').innerHTML = `
        <p>Nenhuma categoria selecionada.</p>
        <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block;">Voltar ao Início</a>
      `;
      return;
    }

    // Mostra skeleton loading
    renderizarSkeleton();

    try {
      let categoria, passeios;

      if (USE_MOCK) {
        // Usa dados mock (simulação de backend)
        // Simula delay de rede para demonstrar o skeleton
        await new Promise(function(resolve) { setTimeout(resolve, 800); });

        categoria = buscarCategoriaMock(categoriaId);
        passeios = buscarPasseiosMock(categoriaId);
      } else {
        // Consome API real do backend
        categoria = await buscarCategoriaAPI(categoriaId);
        passeios = await buscarPasseiosAPI(categoriaId);
      }

      if (!categoria) {
        throw new Error('Categoria não encontrada');
      }

      // Atualiza o hero com dados da categoria
      atualizarHero(categoria);

      // Renderiza os cards de passeios
      renderizarPasseios(passeios, categoria);

    } catch (erro) {
      console.error('Erro ao carregar dados:', erro);
      document.getElementById('passeios-container').style.display = 'none';
      document.getElementById('mensagem-erro').style.display = 'block';
      document.getElementById('mensagem-erro').innerHTML = `
        <p>Erro ao carregar os passeios. Tente novamente mais tarde.</p>
        <a href="index.html" class="btn-primary" style="margin-top: 1rem; display: inline-block;">Voltar ao Início</a>
      `;
    }
  }

  /* ── INICIALIZAÇÃO ─────────────────────────────── */
  inicializarPagina();

});