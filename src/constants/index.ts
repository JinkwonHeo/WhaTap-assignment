import { QUEUE_FORMAT } from './queueFormat';
import { WIDGET_INFORMATION } from './widgetInformation';

const TODAY_MIDNIGHT = new Date().setHours(0, 0, 0);
const SECOND = 1000;
const MINUTE = 1000 * 60;
const HOUR = 1000 * 60 * 60;
const DAY = 1000 * 60 * 60 * 24;

export { TODAY_MIDNIGHT, DAY, HOUR, MINUTE, SECOND, QUEUE_FORMAT, WIDGET_INFORMATION };
