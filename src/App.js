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
        const response = await fetch('https://of900lijd5.execute-api.us-east-1.amazonaws.com/v2/front-end/grid-people'); // URL da API
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
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div>
          </div>
          <div className="grid-item"><h5>MATTIS AUGUE TRISTIQUE</h5> <div className="bloco"><img src="/icon2.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div></div>
          <div className="grid-item"><h5>ELEMENTUM LACUS VITAE</h5><div className="bloco"><img src="/icon3.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div></div>
          <div className="grid-item"><h5>MAURIS BIBENDUM ODIO LIGULA</h5><div className="bloco"><img src="/icon4.png" alt="Icon 1" className="icon" />
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p></div></div>
        </div>
      </div>
      <div className="sobrenos">
        <div className="quadrado imagem"><img src="/slide2.jpeg" alt="Slide 2" className="slide-img" /></div>
        <div className="quadrado texto-sobrenos">
          <h1>Sobre nós</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
      <div className="como-funciona">
        <h1>COMO FUNCIONA?</h1>
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
        <h1>RODAPÉ</h1>
      </div>
    </div>
  );
}

export default App;
