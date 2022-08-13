from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .sendpacket import SendPacket
from utils.replyformat import ReplyFormat
import logging
import traceback

logger = logging.getLogger("django")

class SendPacketAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('macaddr') == None:
                message = 'You need the target MAC address.'
                logger.error(message)
                return Response(
                    ReplyFormat.status_400(message),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                sendpacket = SendPacket()
                result = sendpacket.sendpacket(self.kwargs.get('macaddr'))
                logger.info(result)
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
