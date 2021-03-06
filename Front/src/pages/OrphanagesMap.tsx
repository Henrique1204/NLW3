import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../estilos/pages/orphanagesMap.css";

import marcadorImg from "../img/marcador-mapa.svg";

function OrphanagesMaps() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={marcadorImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map
                center={[ -23.8486116, -46.7001266]}
                zoom={15}
                style={ { width: "100%", height: "100%" } }
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMaps;
