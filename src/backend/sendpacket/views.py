from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .sendpacket import SendPacket
import logging
import traceback

logger = logging.getLogger("django")

class SendPacketAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        try:
            macaddr = request.data
            logger.error(macaddr)
            sendpacket = SendPacket()
            response = sendpacket.sendpacket(macaddr)
            return Response(response, status=status.HTTP_200_OK)
        except:
            logger.error(traceback.format_exc())
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
