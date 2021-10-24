import {Navigation} from "../models/navigation";

export class DownloadConstant {
  public static readonly ALL_DOWNLOADS_NAVIGATION = new Navigation(
    'all-downloads',
    'All Downloads',
    'all-downloads',
    'download_for_offline'
  );
  public static readonly DOWNLOADING_NAVIGATION = new Navigation(
    'downloading',
    'Downloading',
    'downloading',
    'input'
  );
  public static readonly COMPLETED_NAVIGATION = new Navigation(
    'completed',
    'Completed',
    'completed',
    'check_circle'
  );
  public static readonly INCOMPLETE_NAVIGATION = new Navigation(
    'incomplete',
    'Incomplete',
    'incomplete',
    'file_download_off'
  );
  public static readonly DEFAULT_DOWNLOAD_NAVIGATION_LIST: Navigation[] = [
    DownloadConstant.ALL_DOWNLOADS_NAVIGATION,
    DownloadConstant.DOWNLOADING_NAVIGATION,
    DownloadConstant.COMPLETED_NAVIGATION,
    DownloadConstant.INCOMPLETE_NAVIGATION
  ]
  public static readonly ADD_DOWNLOAD_TYPES =   {
    DOWNLOAD_NOW : 'download-now',
    DOWNLOAD_LETTER: 'download-letter'
  }
  public static readonly CONNECTION_SELECT_LIST = [2, 4, 8, 16, 32]
}
