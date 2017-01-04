import { parse, stringify } from './ChordsFormat'

const pairs = [
  {
    string: '---[Verse:1]---\nasd {c}[B]{/c}qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  },
  {
    string: '---[Verse:1]---\nasd {c}[B]{/c}qwe\nasd {c}[B]{/c}qwe',
    object: {
      verses: [
        {
          name: 'Verse:1',
          lines: [
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ],
            [
              {
                chord: null,
                text: 'asd '
              },
              {
                chord: 'B',
                text: 'qwe'
              }
            ]
          ]
        }
      ]
    }
  }
]

it('should stringify correctly', () => {
  pairs.forEach((p) => expect(stringify(p.object)).toEqual(p.string))
})

it('should parse correctly', () => {
  pairs.forEach((p) => expect(parse(p.string)).toEqual(p.object))
})
