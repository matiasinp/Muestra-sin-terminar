import React, {useState, useEffect} from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import axios from "axios";
import Template from './template-sidebar-bioquim/Template';
import Admin from './admin/Admin';

const App = () => {
  const [areas, setAreas] = useState([]);

  const [news, setNews] = useState([]);

  const [active, setActive] = useState ("");

  const [admin, setAdmin] = useState(false);

  const sortIgnoringAccents = list => {
    list.sort((a, b) => {
      let Diacritics = require('diacritic');

      let keyA = Diacritics.clean(a.title);
      let keyB = Diacritics.clean(b.title);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  }

  useEffect(() => {
    if (window.location.pathname == "/admin") {
      setAdmin(true);
    }
    else {
      const fetchData = async () => {
        const result1 = await axios(
          'http://localhost:8000/api/areas/',
        );

        const result2 = await axios(
          'http://localhost:8000/api/areasBrands/',
        );

        sortIgnoringAccents(result2.data);

        //flag: se encarga de comprobar que ninguno de las areas tengan un indice definido
        let flag = false;
        result1.data = result1.data.filter(area => {
          area.brands = [];
          result2.data.map(areaBrand => {
            if (areaBrand.area === area.id) {
              area.brands.push(areaBrand);
            }
          });

          area.show = false;
          if (area.index !== 0) flag = true;
          return area.brands.length > 0;
        });

        if (flag) {
          result1.data.sort(function(a, b) {
            if (a.index < b.index) return -1;
            if (a.index > b.index) return 1;
            return 0;
          });
        } else {
          sortIgnoringAccents(result1.data);
        }
        setAreas(result1.data);

        const result3 = await axios(
          'http://localhost:8000/api/news/',
        );

        const result4 = await axios(
          'http://localhost:8000/api/images/',
        );

        const result5 = await axios(
          'http://localhost:8000/api/crops/',
        );
        result4.data.map(image => {
          if (image.width > image.height) {
            image.mobile = false;
          } else {
            image.mobile = true;
          }
          for (let i = 0; i < result5.data.length; i++) {
            if (image.id === result5.data[i].image) {
              image.point = result5.data[i].point;
              break;
            }
          }
        });

        if (typeof result3.data !== undefined) {
          result3.data.map(_new => {
            _new.images = [];
            result4.data.map(image => image.new === _new.id && _new.images.push(image));
          });
        }

        setNews(result3.data);
      };

      fetchData();
    }
  }, []);

  const data = {
    "areas": areas,
    "setAreas": setAreas,
    "news": news,
    "setNews": setNews
  };

  const display = {
    "subtitle": "Áreas",
    "footer": {
      "name": "BioquimDiagnostics S.A.",
      "adress": "C. Durango 1429 6º A/B",
      "tel": " +598 2916 8969",
      "facebook": "Bioquim Uruguay",
      "instagram": "@bioquim.quimica",
    },
    "links": {
      "tel": 59829168969,
      "facebook": "https://es-la.facebook.com/pages/category/Medical-Company/Bioquim-Uruguay-165266647147706/",
      "instagram": "https://www.instagram.com/bioquim.quimica/?hl=es",
    },
    "active" : active,
    "setActive" : setActive
  };

  return (
    <div className="App">
      {
        admin
        ?
          <Router>
            <Admin />
          </Router>
        :
          <Router>
            <Template data={data} display={display} />
          </Router>
      }
    </div>
  );
}

export default App;
