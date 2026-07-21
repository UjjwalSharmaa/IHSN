export default {
    name: 'siteSettings',
    title: 'Logos',
    type: 'document',
    fields: [
        {
            name: 'logoLeft',
            title: 'Left Logo',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'logoRight',
            title: 'Right Logo',
            type: 'image',
            options: { hotspot: true },
        },
    ],
}