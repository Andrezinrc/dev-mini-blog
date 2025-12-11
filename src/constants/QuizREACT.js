export const questionsReact = [
  {
    id: 1,
    question: "Qual hook é usado para adicionar estado a componentes funcionais?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    answer: 1
  },
  {
    id: 2,
    question: "Qual método de ciclo de vida NÃO existe em componentes funcionais com hooks?",
    options: ["componentDidMount", "useEffect", "useState", "useMemo"],
    answer: 0
  },
  {
    id: 3,
    question: "Qual sintaxe é usada para renderizar conteúdo condicionalmente em JSX?",
    options: [
      "if-else statements diretamente no JSX",
      "Operador ternário ({condicao ? verdadeiro : falso})",
      "Somente com switch-case",
      "Não é possível renderização condicional"
    ],
    answer: 1
  },
  {
    id: 4,
    question: "O que as 'keys' ajudam o React a fazer nas listas?",
    options: [
      "Melhorar performance na re-renderização",
      "Estilizar os elementos",
      "Adicionar eventos de clique",
      "Criar animações"
    ],
    answer: 0
  },
  {
    id: 5,
    question: "Qual hook é ideal para executar efeitos colaterais?",
    options: ["useState", "useEffect", "useCallback", "useMemo"],
    answer: 1
  },
  {
    id: 6,
    question: "O que é JSX?",
    options: [
      "JavaScript XML - extensão de sintaxe do JavaScript",
      "Uma nova linguagem de programação",
      "Uma biblioteca separada do React",
      "Um pré-processador CSS"
    ],
    answer: 0
  },
  {
    id: 7,
    question: "Como se atualiza o estado baseado no estado anterior?",
    options: [
      "setState(novoValor)",
      "setState(prevState => novoValor)",
      "state = novoValor",
      "this.setState(novoValor)"
    ],
    answer: 1
  },
  {
    id: 8,
    question: "O que significa 'React é declarativo'?",
    options: [
      "Descrevemos O QUE queremos, não COMO fazer",
      "Temos que controlar manualmente o DOM",
      "Precisamos usar muitas variáveis de estado",
      "A performance é sempre a melhor possível"
    ],
    answer: 0
  },
  {
    id: 9,
    question: "Qual hook memoriza um valor para evitar recálculos desnecessários?",
    options: ["useMemo", "useCallback", "useEffect", "useRef"],
    answer: 0
  },
  {
    id: 10,
    question: "O que é prop drilling?",
    options: [
      "Passar props através de múltiplos componentes",
      "Um hook para perfuração de dados",
      "Método para acessar o DOM",
      "Técnica de otimização de performance"
    ],
    answer: 0
  }
];