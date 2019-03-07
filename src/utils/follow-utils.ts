import { request, getPortalUrl } from '@esri/arcgis-rest-request';
import { UserSession } from '@esri/arcgis-rest-auth';
import { IUser } from '@esri/arcgis-rest-common-types';

const getTag = (initiativeId:string) => `hubInitiativeId|${initiativeId}`;

const getUpdateUrl = (session:UserSession) => `${getPortalUrl(session)}/community/users/${session.username}/update`

export const currentlyFollowedInitiatives = (user:IUser):string[] => user.tags.map(tag => tag.replace(/^hubInitiativeId\|/, ''));

export const isUserFollowing = (user:IUser, initiativeId:string):boolean => currentlyFollowedInitiatives(user).includes(initiativeId);

export const followInitiative = (initiativeId:string, user:IUser, authentication:UserSession):Promise<any> => {
  const tag = getTag(initiativeId);
  // don't update if already following
  if (user.tags.includes(tag)) {
    return Promise.reject(`user is already following this initiative`);
  }
  user.tags.push(tag);

  return request(getUpdateUrl(authentication), {
    params: { tags: user.tags },
    authentication
  });
}

export const unfollowInitiative = (initiativeId:string, user:IUser, authentication:UserSession):Promise<any> => {
  const tag = getTag(initiativeId);
  // don't update if user isn't following
  if (!user.tags.includes(tag)) {
    return Promise.reject(`user is not following this initiative`);
  }

  // https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string
  const index = user.tags.indexOf(tag);
  if (index !== -1) {
    user.tags.splice(index, 1);
  }

  // we could clear the last tag by passing "," but less logic is required if we just substitue another real tag.
  if (user.tags.length === 0) {
    user.tags.push('Independent thinker')
  }

  return request(getUpdateUrl(authentication), {
    params: { tags: user.tags },
    authentication
  });
}