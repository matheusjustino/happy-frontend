import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import '../styles/pages/orphanage.css';
import { Sidebar } from "../components/Sidebar";
import { Orphanage as IOrphanage } from '../interfaces/orphanage.interface';
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface RouteParams {
	id: string;
}

export default function Orphanage() {
	const { id } = useParams<RouteParams>();
	const [orphanage, setOrphanage] = useState<IOrphanage>();
	const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`orphanages/${id}`).then(response => {
            setOrphanage(response.data);
        });
	}, [id]);
	
	if (!orphanage) {
		return <p>Carregando...</p>;
	};

	return (
		<div id="page-orphanage">
			<Sidebar />

			<main>
				<div className="orphanage-details">
				<img src={`${orphanage.images[activeImageIndex].url}`} alt="Lar das meninas" />

				<div className="images">
					{orphanage.images.map((image, index) => {
						return(
							<button
								key={image.id}
								className={activeImageIndex === index ? 'active' : ''}
								type="button"
								onClick={() => setActiveImageIndex(index)}
								>
								<img src={`${image.url}`} alt={`${orphanage.name}`} />
							</button>
						);
					})}
				</div>
				
				<div className="orphanage-details-content">
					<h1>Lar das meninas</h1>
					<p>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</p>

					<div className="map-container">
					<Map 
						center={[orphanage.latitude, orphanage.longitude]} 
						zoom={16} 
						style={{ width: '100%', height: 280 }}
						dragging={false}
						touchZoom={false}
						zoomControl={false}
						scrollWheelZoom={false}
						doubleClickZoom={false}
					>
						<TileLayer 
						url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
						/>
						<Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
					</Map>

					<footer>
						<a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
					</footer>
					</div>

					<hr />

					<h2>Instruções para visita</h2>
					<p>{orphanage.description}</p>

					<div className="open-details">
						<div className="hour">
							<FiClock size={32} color="#15B6D6" />
							Segunda à Sexta <br />
							{orphanage.opening_hours}
						</div>
						{
							orphanage.open_on_weekends ?
							<div className="open-on-weekends">
								<FiInfo size={32} color="#39CC83" />
								Atendemos <br />
								fim de semana
							</div>
							:
							<div className="open-on-weekends dont-open">
								<FiInfo size={32} color="#FF669D" />
								Não atendemos <br />
								fim de semana
							</div>
						}
					</div>

					<button type="button" className="contact-button">
					<FaWhatsapp size={20} color="#FFF" />
					Entrar em contato
					</button>
				</div>
				</div>
			</main>
		</div>
	);
}