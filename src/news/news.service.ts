import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { HttpService } from '@nestjs/common';

@Injectable()
class NewsService {
  constructor(private httpService: HttpService) {}

  async getNews(params: ParamsNewsDto) {
    const queryParams = this.createRequest(params);
    const apiResponse = await this.consume(queryParams).catch((e) => {
      throw new HttpException(
        { status: e.response.status, error: "NEWS API: "+e.response.data.message },
        e.response.status,
      );
    });
    const articles = this.parseNews(apiResponse.data.articles);
    return articles;
  }

  consume(query: string) {
    return this.httpService
      .get('https://newsapi.org/v2/everything?' + query)
      .toPromise();
  }

  parseNews(results: []) {
    const list = results.map((item) => {
      const { title, url,  publishedAt, source } = item;
      return new NewsDto(title, url, publishedAt, '', source['name']);
    });
    return list;
  }

  createRequest(params: ParamsNewsDto) {
    let url = '';
    url += params.hasOwnProperty('q') ? 'q=' + params.q : '';

    if (params.hasOwnProperty('oncontent')) {
      const beforeSection =
        url.length > 3
          ? (url = 'q=' + params.oncontent + '&qInTitle=' + params.q)
          : (url = 'q=' + params.oncontent);
    }

    if (params.hasOwnProperty('fromdate')) {
      url +=
        url.length > 3 ? '&from=' + params.fromdate : 'from=' + params.fromdate;
    }

    if (params.hasOwnProperty('todate')) {
      url += url.length > 3 ? '&to=' + params.todate : 'to=' + params.todate;
    }

    if (params.hasOwnProperty('onpage'))
      url +=
        url.length > 3 ? '&page=' + params.onpage : 'page=' + params.onpage;

    return url + '&apiKey=' + process.env.NEWS_KEY;
  }
}

export default NewsService;
