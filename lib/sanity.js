import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Helper to get image URLs from Sanity
const builder = imageUrlBuilder(client)

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

export function urlFor(source) {
    return builder.image(source)
}

// Fetch functions for each content type
export async function getSliderImages() {
    return client.fetch(`*[_type == "slider"] | order(order asc)`)
}

export async function getAboutSection(section) {
    return client.fetch(`*[_type == "about" && section == $section][0]`, { section })
}

export async function getNewsEvents() {
    return client.fetch(`*[_type == "newsEvent"] | order(date desc)`)
}

export async function getExhibitions() {
    return client.fetch(`*[_type == "exhibition"] | order(_createdAt desc)`)
}

export async function getHomeExhibitions() {
    return client.fetch(`*[_type == "exhibition" && showOnHome == true] | order(_createdAt desc)`)
}

export async function getGalleries() {
    return client.fetch(`*[_type == "gallery"] | order(_createdAt desc)`)
}
export async function getHomeGalleries() {
    return client.fetch(`*[_type == "gallery" && showOnHome == true] | order(_createdAt desc)`)
}

export async function getGalleryById(id) {
    return client.fetch(`*[_type == "gallery" && _id == $id][0]`, { id })
}

export async function getClients() {
    return client.fetch(`*[_type == "client"] | order(_createdAt asc)`)
}

export async function getSocialLinks() {
    return client.fetch(`*[_type == "social"] | order(order asc)`)
}

