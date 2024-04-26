import { TagsPaginationResponse, Tag } from '../types/Tags';
import client from './client';

export function saveTag(tag: Tag): Promise<Tag> {
  return tag.id ? editTag(tag) : addTag(tag);
}

export function getTags(): Promise<TagsPaginationResponse> {
  return client
    .get(`/api/tags`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getTagById(id: number): Promise<Tag> {
  return client
    .get(`/api/tags/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addTag(tag: Tag): Promise<Tag> {
  tag.type = Number(tag.type);
  return client
    .post(`/api/tags`, tag)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editTag(tag: Tag): Promise<Tag> {
  tag.type = Number(tag.type);
  return client
    .put(`/api/tags/${tag.id}`, tag)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeTag(tag: Tag): Promise<null> {
  return client
    .delete(`/api/tags/${tag.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
