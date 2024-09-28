import React, { useEffect, useState } from 'react';
import './App.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const RadialLoader = () => {
  const percentage = 82; 

  const data = {
    labels: ['Carregando', 'Concluído'],
    datasets: [
      {
        data: [percentage, 100 - percentage], // Totalizando 100
        backgroundColor: ['#FFFFFF', '#404A58'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '90%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Ocultar legenda
      },
      tooltip: {
        enabled: false, // Ocultar tooltip
      },
      // Plugin para adicionar o percentual no centro
      // Adicionando um plugin inline
      datalabels: {
        display: false, // Ocultar os rótulos do gráfico
      },
    },
  };

  const plugins = [
    {
      id: 'centerText',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;
        const fontSize = (height / 114).toFixed(2); // Tamanho do texto
        ctx.restore();
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textBaseline = 'middle';
        
        const text = `${percentage}%`; // Texto a ser exibido
        const textX = Math.round((width - ctx.measureText(text).width) / 2); // Centralizar
        const textY = height / 2; // Centralizar

        ctx.fillStyle = '#404A58'; // Cor do texto
        ctx.fillText(text, textX, textY); // Desenhar o texto
        ctx.save();
      },
    },
  ];

  return (
    <div style={{ width: '200px', height: '200px' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Vendas por Produto',
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Pie data={chartData} options={options} />;
};

function App() {
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://of900lijd5.execute-api.us-east-1.amazonaws.com/v2/front-end/grid-people');
        const data = await response.json();
        setTableData(data);
        setChartData(data.map(item => ({ name: item.nome, value: parseFloat(item.participacao) })));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="App">
      <div className="main">
        <div className="center">
          <div className="menu">
            <div className="logo">
              <h3>Cubo Coworking</h3>
            </div>
            <div>
              <a href="#" className="home">HOME</a>
              <a href="#" className="itens-menu">MENU 2</a>
              <a href="#" className="itens-menu">MENU 3</a>
              <a href="#" className="itens-menu">MENU 4</a>
            </div>
          </div>
        </div>
      </div>
      <div className="slide">
        <Slider {...settings}>
          <div>
            <img src="/slide.jpeg" alt="Slide 1" className="slide-img" />
          </div>
          <div>
            <img src="/slide2.jpeg" alt="Slide 2" className="slide-img" />
          </div>
          <div>
            <img src="/slide3.jpeg" alt="Slide 3" className="slide-img" />
          </div>
        </Slider>
      </div>
      <div className='servicos'>
        <h3>Serviços</h3>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h4>
        <div className="grid-servicos">
          <div className="grid-item"><h5>RHONCUS PURUS IN</h5>
            <div className="bloco"><img src="/icon1.png" alt="Icon 1" className="icon" />
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p></div>
          </div>
          <div className="grid-item"><h5>MATTIS AUGUE TRISTIQUE</h5> <div className="bloco"><img src="/icon2.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p></div></div>
          <div className="grid-item"><h5>ELEMENTUM LACUS VITAE</h5><div className="bloco"><img src="/icon3.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p></div></div>
          <div className="grid-item"><h5>MAURIS BIBENDUM ODIO LIGULA</h5><div className="bloco"><img src="/icon4.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p></div></div>
        </div>
      </div>
      <div className="sobrenos">
        <div className="quadrado imagem"><img src="/slide2.jpeg" alt="Slide 2" className="slide-img" /></div>
        <div className="quadrado texto-sobrenos">
          <h1>Sobre nós</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industryis simply dummy text of the printing and typesetting industry.</p>
          <RadialLoader />
        </div>
      </div>
      <div className="funciona">
        <h1>COMO FUNCIONA?</h1>
        <div className="como-funciona">
          <div className="passo1"><img src="/world.png" alt="Slide 2" className="icon-como-funciona" /><h4>PASSO 1</h4>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and typesetting industryis</p>
          </div>
          <div className="passo2"><img src="/cart.png" alt="Slide 2" className="icon-como-funciona" /><h4>PASSO 2</h4>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and typesetting industryis </p>
          </div>
          <div className="passo3"><img src="/like.png" alt="Slide 2" className="icon-como-funciona" /><h4>PASSO 3</h4>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and typesetting industryis </p>
          </div>
          <div className="passo4"><img src="/truck.png" alt="Slide 2" className="icon-como-funciona" /><h4>PASSO 4</h4>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry is simply dummy text of the printing and typesetting industryis </p>
          </div>
        </div>
        <div className="botao-leiamais">
          <button type="submit"><h4>LEIA MAIS</h4></button>
        </div>
      </div>
      <div className="cadastro">
        <h1>CADASTRE-SE</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="form-center">
          <form>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder="Nome" className="icon-input" />
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder="Email" className="icon-input" />
              </div>
              <div className="form-group">
                <input type="tel" id="phone" name="phone" placeholder="Telefone" className="icon-input" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit">ENVIAR</button>
            </div>
          </form>
        </div>
      </div>
      <div className="dados">
        <h1>DADOS</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="dados-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Participação</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nome}</td>
                  <td>{item.sobrenome}</td>
                  <td>{item.participacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grafico-pizza">
            <PieChartComponent data={chartData} />
          </div>
        </div>
      </div>
      <div className="rodape">
        <div className="informacoes">
          <p className="cubo">CUBO</p>
          <p>Rua Casa do Ator, 123</p>
          <p>01458-532 - São Paulo, SP</p>
          </div>
          <div className="icons">
            <img src="/facebook.png" alt="Icon Facebook" className="icon-rodape" />
            <img src="/google-plus.png" alt="Google Plus" className="icon-rodape" />
            <img src="/twitter.png" alt="Twitter" className="icon-rodape" />
            <img src="/youtube.png" alt="Youtube" className="icon-rodape" />
          </div>
      </div>
      <div className="rodapedois">
              @copyright 2016 - Lorem ipsum dolor sit amet consectetur
      </div>
    </div>
  );
}

export default App;
