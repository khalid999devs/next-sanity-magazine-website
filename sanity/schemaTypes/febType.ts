import { CaseIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const febType = defineType({
  name: 'february',
  title: '18 feb',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bannerimage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'proofImages',
      title: 'Proof Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
            }),
          ],
          preview: {
            select: {
              image: 'image',
              description: 'description',
              category: 'category.title',
            },
            prepare(select) {
              const description = select.description;
              const text =
                description && description[0]?.children
                  ? description[0].children
                      .map((child: any) => child.text)
                      .join(' ')
                  : 'No description';
              return {
                media: select.image,
                title: select.category,
                subtitle: text.length <= 18 ? text : text.slice(0, 18) + '...',
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'proofVideos',
      title: 'Proof Videos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {
                accept: 'video/*',
              },
            }),
            defineField({
              name: 'thumbnail',
              title: 'Video Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
            defineField({
              name: 'category',
              title: 'Category',
              type: 'reference',
              to: [{ type: 'category' }],
            }),
          ],
          preview: {
            select: {
              thumbnail: 'thumbnail',
              description: 'description',
              category: 'category.title',
            },
            prepare({ thumbnail, description, category }) {
              const text =
                description && description[0]?.children
                  ? description[0].children
                      .map((child: any) => child.text)
                      .join(' ')
                  : 'No description';

              return {
                media: thumbnail,
                title: category,
                subtitle: text.length <= 18 ? text : text.slice(0, 18) + '...',
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'timeline',
      title: 'Timeline story',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: {
              image: 'image',
              description: 'description',
            },
            prepare(select) {
              const { description } = select;
              const text =
                description && description[0]?.children
                  ? description[0].children
                      .map((child: any) => child.text)
                      .join(' ')
                  : 'No description';
              return {
                media: select.image,
                title: text.length <= 50 ? text : text.slice(0, 50) + '...',
                subtitle: '',
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'bannerimage',
      subtitle: 'subtitle',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: select.subtitle,
        media: select.media,
      };
    },
  },
});
