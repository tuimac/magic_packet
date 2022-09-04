from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .arp import Arp
from utils.replyformat import ReplyFormat
import logging
import traceback

logger = logging.getLogger("django")

class ArpAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('ip') == None:
                message = 'There is no IP address in the query parameter.'
                logger.error(message)
                return Response(
                    ReplyFormat.status_400(message),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                interface = self.kwargs.get('interface')
                arp = Arp()
                result = arp.sendpacket(dest_ip=self.kwargs.get('ip'), interface=interface)
                
                # Retry up to 3 times
                for i in range(2):
                    logger.info(result)
                    if result['code'] == 2:
                        result = arp.sendpacket(dest_ip=self.kwargs.get('ip'), interface=interface)
                    else:
                        break

                return Response(
                    ReplyFormat.status_200(result),
                    status=status.HTTP_200_OK
                )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
