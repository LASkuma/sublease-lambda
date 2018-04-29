import Vue from 'vue';
import moment from 'moment';
import config from '../../config';

const renderer = require('vue-server-renderer').createRenderer();

const template = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/mint-ui/lib/style.css" />
  <link rel="stylesheet" href="/statics/style.css" />
  <title>sublease</title>

</head>

<body>
  <div id="app">
    <mt-swipe
      class="image"
      :auto="4000"
    >
      <mt-swipe-item
        v-for="url in imageUrls"
        :key="url"
      >
        <img
          class="image"
          :src="url" />
      </mt-swipe-item>
    </mt-swipe>

    <div class="info">
      <h3 class="address">
        {{ post.address }}
      </h3>
      <h3 class="address">
        {{ post.city }}, {{ post.state }}
      </h3>
      <h3 class="type">
        {{ post.type }} in {{ apartmentType }}
      </h3>
      <div class="price">
        \${{ post.price }}
      </div>
      <div class="time">
        {{ displayTime }}
      </div>
      <p>
        {{ post.description }}
      </p>
      <mt-button
        type="default"
        size="large"
        @click.native="$router.push('/')"
      >
        See more Listings
      </mt-button>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://unpkg.com/mint-ui/lib/index.js"></script>
  <script src="/statics/controll.js"></script>
</body>

</html>
`;

export default async function preRender({ post }) {
  const app = new Vue({
    template,
    data: {
      post,
    },
    computed: {
      imageUrls() {
        const result = [];
        const { pictureId, pictureNumber } = this.post;

        for (let i = 0; i < pictureNumber; i += 1) {
          result.push(`${config.ImageURL}/${pictureId}_${i}`);
        }

        return result;
      },

      apartmentType() {
        if (this.post.bedrooms === 0) {
          return 'Studio';
        }
        return `${this.post.bedrooms}B${this.post.bathrooms}B`;
      },

      displayTime() {
        const from = moment(this.post.from).format('MM/DD');
        if (this.post.to) {
          const to = moment(this.post.to).format('MM/DD');
          return `${from}-${to}`;
        }
        return `From: ${from}`;
      },
    },
  });

  return renderer.renderToString(app);
}
