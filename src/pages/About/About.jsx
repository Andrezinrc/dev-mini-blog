import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sobre <span>Mim</span></h1>
        <p className={styles.subtitle}>
          Conheça um pouco da minha trajetória e paixões
        </p>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2>Minha Jornada</h2>
          <p>
            Sou apaixonado por tecnologia e estou sempre estudando e aplicando meus conhecimentos em projetos práticos. 
            Iniciei minha jornada de forma autodidata, assistindo vídeos no YouTube, e desde 2020 venho me dedicando cada vez mais ao desenvolvimento.
          </p>
          <p>
            O que mais me motiva é a possibilidade de criar soluções que realmente fazem diferença na vida das pessoas. 
            Cada linha de código representa um problema resolvido, uma ideia que ganha vida.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Além do Código</h2>
          <p>
            Acredito que a criatividade precisa de diferentes estímulos. Quando não estou programando, gosto de explorar 
            outras formas de expressão - seja através da fotografia, descobrindo novos lugares ou simplesmente observando 
            como as coisas funcionam ao meu redor.
          </p>
          <p>
            Essas experiências fora do mundo digital frequentemente me trazem insights valiosos para resolver desafios técnicos.
          </p>
        </section>
        
        <section className={styles.section}>
          <h2>Meus Companheiros</h2>
          <p>
            No meu tempo livre, adoro passar momentos com meus cachorros, que tornam meus dias muito melhores.
            Eles me lembram da importância das pausas, dos momentos de descontração e da lealdade incondicional.
          </p>
          <p>
            São eles que me esperam animados depois de um dia intenso de trabalho, prontos para um carinho ou uma brincadeira.
          </p>
          <img src="/assets/images/my-dogs.jpeg" alt="Meus três cachorros" className={styles.dogImage} />
        </section>

        <section className={styles.section}>
          <h2>O Que Me Move</h2>
          <p>
            Tenho uma curiosidade natural por entender como as coisas funcionam - desde os algoritmos mais complexos 
            até as relações mais simples do dia a dia. Essa busca por compreensão é o que me mantém aprendendo e evoluindo.
          </p>
          <p>
            Valorizo a autenticidade, o trabalho bem feito e acredito que o conhecimento compartilhado tem um poder transformador.
          </p>
        </section>

        <section className={styles.section}>
          <p>
            Este espaço é um registro da minha jornada, aprendizado e paixões, e sempre será um cantinho para compartilhar 
            conhecimento e momentos especiais de forma genuína e transparente.
          </p>
        </section>
      </div>
    </div>
  );
}