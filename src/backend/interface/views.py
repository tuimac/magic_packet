from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import logging
import traceback
import os
from utils.net import Net

logger = logging.getLogger("django")

class InterfaceListAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            result = os.listdir('/sys/class/net')
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

class InterfaceInfoAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            if self.kwargs.get('interface') == None:
                message = ''
                logger.error(message)
                return Response(
                    ReplyFormat.status_400(message),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                result = dict()
                info = Net.get_ip_from_if(self.kwargs.get('interface'))
                result['ip'] = 
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
