import { UserSession } from '@esri/arcgis-rest-auth';

export const readSessionFromCookie = ():string => {
  const b = document.cookie.match('(^|[^;]+)\\s*' + 'arcgis_hub_component_auth' + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : undefined;
}

export const writeSessionToCookie = (session:UserSession):void => {
  let date = new Date();
  // two week expiration
  date.setTime(date.getTime() + (14*24*60*60*1000));

  document.cookie = `arcgis_hub_component_auth=${session.serialize()} ; expires=${date.toUTCString()} path=/`;
}
