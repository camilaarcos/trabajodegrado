export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const data = [
  { title: "Accidente de Tránsito", icon: "car" },
  { title: "Acoso Sexual", icon: "ban" },
  { title: "Amenazas", icon: "exclamation-triangle" },
  { title: "Extorsión", icon: "money" },
  { title: "Homicidio", icon: "user-times" },
  { title: "Hurto", icon: "hand-paper-o" },
  { title: "Suicidio", icon: "meh-o" },
  { title: "Violencia", icon: "hand-rock-o" },
  { title: "Violencia Intrafamiliar", icon: "home" },
];
export const dataBarrio = [
  { title: "Agua clara" },
  { title: "Aguirre" },
  { title: "Alameda" },
  { title: "Alameda II" },
  { title: "Alvernia" },
  { title: "Asoagrin" },
  { title: "Bello Horizonte" },
  { title: "Avenida Cali" },
  { title: "Bolivar" },
  { title: "Bosques de Maracaibo" },
  { title: "Buenos Aires" },
  { title: "Casa Huertas" },
  { title: "Centro" },
  { title: "Cespedes" },
  { title: "Chiminangos" },
  { title: "Ciudad Campestre" },
  { title: "Ciudad Las Palmas" },
  { title: "Comfamiliar" },
  { title: "Comuneros" },
  { title: "Conjunto La Villa" },
  { title: "Conjunto Lusitania" },
  { title: "Corazon del Valle" },
  { title: "Departamental" },
  { title: "Diablos Rojos" },
  { title: "Diablos Rojos II" },
  { title: "Doce de octubre" },
  { title: "Dorado" },
  { title: "El Bosque" },
  { title: "El Bosquecito" },
  { title: "El Condor" },
  { title: "El Condor II" },
  { title: "El Descanso" },
  { title: "El Lago" },
  { title: "El Laguito" },
  { title: "El Limonar" },
  { title: "El Palmar" },
  { title: "El Paraiso" },
  { title: "El Pinar" },
  { title: "El Refugio" },
  { title: "El Retiro" },
  { title: "Entre Rios" },
  { title: "Escobar" },
  { title: "Esperanza" },
  { title: "Estambul" },
  { title: "Farfan" },
  { title: "Fatima" },
  { title: "Flor de la Campana" },
  { title: "Franciscanos" },
  { title: "Guayacanes" },
  { title: "Horizonte" },
  { title: "Internacional" },
  { title: "Jardin" },
  { title: "Jazmin" },
  { title: "Jorge Eliecer Gaitan" },
  { title: "José Antonio Galan" },
  { title: "Juan de Lemus" },
  { title: "Juan XXIII" },
  { title: "La Bastilla" },
  { title: "La Campiña" },
  { title: "La Ceiba" },
  { title: "La Graciela" },
  { title: "La Independencia" },
  { title: "La Inmaculada" },
  { title: "La Merced" },
  { title: "La Paz" },
  { title: "La Quinta" },
  { title: "La Rivera" },
  { title: "La Santa Cruz" },
  { title: "La Trinidad" },
  { title: "Las Acacias" },
  { title: "Las Americas" },
  { title: "Las Brisas" },
  { title: "Las Delicias" },
  { title: "Las Nieves" },
  { title: "Las Olas" },
  { title: "Las Veraneras" },
  { title: "Laureles" },
  { title: "Laureles II" },
  { title: "Los Olmos" },
  { title: "Los Tolues" },
  { title: "Maracaibo" },
  { title: "Marandua" },
  { title: "Maria Clara" },
  { title: "Miraflores" },
  { title: "Morales" },
  { title: "Moralito" },
  { title: "Municipal" },
  { title: "Nariño" },
  { title: "Nuevo Alvernia" },
  { title: "Nuevo Morales" },
  { title: "Nuevo Principe" },
  { title: "Palobonito" },
  { title: "Panamericano" },
  { title: "Playas" },
  { title: "Popular" },
  { title: "Portales del Rio" },
  { title: "Prados del Norte" },
  { title: "Primero de Mayo" },
  { title: "Principe" },
  { title: "Progresar" },
  { title: "Pueblo Nuevo" },
  { title: "Quintas de San Felipe" },
  { title: "Rio Paila" },
  { title: "Rojas" },
  { title: "Ruben Cruz Velez" },
  { title: "Sajonia" },
  { title: "Salesianos" },
  { title: "Saman del Norte" },
  { title: "San Antonio" },
  { title: "San Benito" },
  { title: "San Carlos" },
  { title: "San Luis" },
  { title: "San Marino" },
  { title: "San Pedro Claver" },
  { title: "San Vicente de Paul" },
  { title: "Santa Isabel" },
  { title: "Santa Rita del Rio" },
  { title: "Senderos Villa Liliana" },
  { title: "Siete de Agosto" },
  { title: "Tercer Milenio" },
  { title: "Tomas Uribe Uribe" },
  { title: "Urbanizacion Lomitas" },
  { title: "Urbanizacion Peñaranda" },
  { title: "Urbanizacion Santa Lucia" },
  { title: "Victoria" },
  { title: "Villa Campestre" },
  { title: "Villa Colombia" },
  { title: "Villa del Lago" },
  { title: "Villa del Rio" },
  { title: "Villa del Sur" },
  { title: "Villa Liliana" },
  { title: "Villanueva" },


];
export const dataRol = [
{ title: "Administrador" },
{ title: "Usuario" },
];

