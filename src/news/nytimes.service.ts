import { Injectable, HttpException } from '@nestjs/common';
import { ParamsNewsDto, NewsDto } from './dto/news.dto';
import { HttpService } from '@nestjs/common';

@Injectable()
class NYTimesService {
  constructor(private httpService: HttpService) {}

  async getNews(params: ParamsNewsDto) {
    const queryParams = this.createRequest(params);
    const apiResponse = await this.consume(queryParams).catch((e) => { console.log(e.response);
      throw new HttpException(
        { status: e.response.status, error: "NYTIMES API: "+e.response.statusText },
        e.response.status,
      );
    });
    const articles = this.parseNews(apiResponse.data.response.docs);
    return articles;
  }

  consume(query: string) {
    return this.httpService
      .get(
        'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
          query +
          '&fl=abstract,source,pub_date,section_name,web_url',
      )
      .toPromise();
  }

  parseNews(results: []) {
    const list = results.map((item) => {
      const { abstract, web_url, pub_date, section_name, source } = item;
      return new NewsDto(abstract, web_url, pub_date, section_name, source);
    });
    return list;
  }

  createRequest(params: ParamsNewsDto) {
    let url = '';
    url += params.hasOwnProperty('q') ? 'q=' + params.q : '';

    if (params.hasOwnProperty('oncontent')) {
      url +=
        url.length > 3
          ? '&fq=body:' + params.oncontent
          : 'fq=body:' + params.oncontent;
    }

    if (params.hasOwnProperty('onsection')) {
      const beforeSection =
        url.length > 3
          ? params.hasOwnProperty('oncontent')
            ? ' AND '
            : '&fq='
          : 'fq=';
      url += beforeSection + 'section_name:' + params.onsection;
    }

    if (params.hasOwnProperty('fromdate')) {
      url +=
        url.length > 3
          ? '&begin_date=' + this.formatDate(params.fromdate)
          : 'begin_date=' + this.formatDate(params.fromdate);
    }

    if (params.hasOwnProperty('todate')) {
      url +=
        url.length > 3
          ? '&end_date=' + this.formatDate(params.todate)
          : 'end_date=' + this.formatDate(params.todate);
    }

    if (params.hasOwnProperty('onpage'))
      url +=
        url.length > 3 ? '&page=' + params.onpage : 'page=' + params.onpage;

    return url + '&api-key=' + process.env.NYT_KEY;
  }

  formatDate(datestr: string) {
    const date = datestr.split('-');
    return date[0] + date[1] + date[2];
  }
}

export default NYTimesService;
