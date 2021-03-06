import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class EmojiBlotTwo extends Embed {
    static create(value) {
        let node = super.create();
        if (typeof value === 'object') {
            node.classList.add("emoji");
            node.classList.add("ap");
            node.classList.add("ap-"+value.name);
            let dataUrl = 'data:image/png;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
            node.setAttribute('src',dataUrl);
            node.setAttribute('data-resize', 'no');
        }
        else if(typeof value === 'string'){
            node.setAttribute('src',value);
        }
        return node;
      }

    static formats(node) {
        // We still need to report unregistered src formats
        let format = {};
        if (node.hasAttribute('class')) {
          format.class = node.getAttribute('class');
        }
        if (node.hasAttribute('alt')) {
          format.width = node.getAttribute('alt');
        }
        return format;
    }

    static value(node) {
        return node.getAttribute('src');
    }

    format(name, value) {
        if (name === 'class' || name === 'alt') {
          if (value) {
            this.domNode.setAttribute(name, value);
          } else {
            this.domNode.removeAttribute(name, value);
          }
        } else {
          super.format(name, value);
        }
    }
}



EmojiBlotTwo.blotName = 'boltTwo';
EmojiBlotTwo.tagName = 'img';

Quill.register({'formats/boltTwo': EmojiBlotTwo}, true);

export default EmojiBlotTwo;