import { Injectable, HttpException } from '@nestjs/common';
import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { HttpService } from '@nestjs/common';

@Injectable()
class GuardianService {
  constructor(private httpService: HttpService) {}

  async getNews(params: ParamsNewsDto) {
    const queryParams = this.createRequest(params);
    const apiResponse = await this.consume(queryParams).catch((e) => {
      throw new HttpException(
        {
          status: e.response.status,
          error: 'THE GUARDIAN API: ' + e.response.data.response.message,
        },
        e.response.status,
      );
    });
    const articles = this.parseNews(apiResponse.data.response.results);
    return articles;
  }

  consume(query: string) {
    return this.httpService
      .get('https://content.guardianapis.com/search?' + query)
      .toPromise();
  }

  parseNews(results: []) {
    const list = results.map((item) => {
      const { webTitle, webUrl, webPublicationDate, sectionName } = item;
      return new NewsDto(
        webTitle,
        webUrl,
        webPublicationDate,
        sectionName,
        'The Guardian',
      );
    });
    return list;
  }

  createRequest(params: ParamsNewsDto) {
    let url = '';
    url += params.hasOwnProperty('q') ? 'q=' + params.q : '';

    if (params.hasOwnProperty('oncontent')) {
      url +=
        url.length > 3
          ? ' AND ' + params.oncontent + '&query-fields=body'
          : 'q=' + params.oncontent + '&query-fields=body';
    }

    if (params.hasOwnProperty('onsection')) {
      url +=
        url.length > 3
          ? '&section=' + params.onsection
          : 'section=' + params.onsection;
    }

    if (params.hasOwnProperty('fromdate')) {
      url +=
        url.length > 3
          ? '&from-date=' + params.fromdate
          : 'from-date=' + params.fromdate;
    }

    if (params.hasOwnProperty('todate')) {
      url +=
        url.length > 3
          ? '&to-date=' + params.todate
          : 'to-date=' + params.todate;
    }

    if (params.hasOwnProperty('onpage'))
      url +=
        url.length > 3 ? '&page=' + params.onpage : 'page=' + params.onpage;

    return url + '&api-key=' + process.env.TG_KEY;
  }
}

export default GuardianService;
