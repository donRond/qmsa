// 'use Client'

// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import { exibeRelatorio } from '@/app/actions/ActionsRelatorios';

// const Grafico2 = () => {
//   const [clientId, setclientId] = useState('');
//   const [faturamento, setFaturamento] = useState<number>();
//   const [cliente, setCliente]= useState('');
//   const [loading, setLoading] = useState(true);


//   const initDate = moment().startOf('month').toISOString();
//   const endDate = moment().endOf('month').toISOString();
//   const [data, setData]= useState([]);

//   const handleExibir = async () => {

//     try{
//       const response = await exibeRelatorio(clientId ||"", initDate, endDate);
//      console.log(response.cliente.map( cliente => cliente.company_name));
//      console.log(response.valorTotal);
// const decimal = parseFloat(response.valorTotal)
     
//       setCliente(response.cliente.map( cliente => cliente.company_name));
//       setFaturamento(decimal);

//     }catch(error){
//       console.error("Erro ao exibir relatório:", error);
//         throw error;
//     }

  

//   }

//   useEffect(() => {
//     handleExibir();
//   }, [clientId]);

  
  


  

//   const options = {
//     chart: {
//       type: 'pie'
//     },
//     title: {
//       text: 'Receita por Cliente'
//     },
//     plotOptions: {
//       pie: {
//         shadow: false,
//         center: ['50%', '50%'],
//         size: '80%',
//         innerSize: '1%',
//         dataLabels: {
//           format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
//           filter: {
//             property: 'y',
//             operator: '>',
//             value: 1
//           },
//           style: {
//             fontWeight: 'normal'
//           }
//         },
//         id: 'receitas'
//       }
//     },
//     series: [{
//       name: 'Receitas',
//       colorByPoint:true,
//       data:[{
//         name:cliente,
//         y:faturamento
//       }]
      
     
//     }],
//     responsive: {
//       rules: [{
//         condition: {
//           maxWidth: 400
//         },
//         chartOptions: {
//           series: [{
//           }, {
//             id: 'receitas',
//             dataLabels: {
//               distance: 10,
//               format: '{point.custom.cliente}',
//               filter: {
//                 property: 'percentage',
//                 operator: '>',
//                 value: 2
//               }
//             }
//           }]
//         }
//       }]
//     }
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default Grafico2;